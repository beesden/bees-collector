#!/usr/bin/env node

const {execSync} = require('child_process');
const {existsSync, mkdirSync, readdirSync, writeFileSync} = require('fs');
const {resolve} = require('path');
const {copySync: copydirSync} = require('fs-extra');
const {sync: rmdirSync} = require('rimraf');
const {Element, ElementTree, SubElement} = require('elementtree');

console.log('Running cordova setup commands');
const startTime = Date.now();
const timerLog = [];


const nodePackage = require('./package');
const Folders = {
	PLATFORMS: resolve(__dirname, 'platforms'),
	PLUGINS: resolve(__dirname, 'plugins'),
	WWW: resolve(__dirname, 'www')
};

const runTask = (task, fn) => {

	console.log(`\n${task}...`);

	const startTime = Date.now();
	fn();
	const time = Date.now() - startTime;

	console.log(`\n${task}... SUCCESS\n`);
	timerLog.push({task, time});
	console.log('********************\n********************');
};

/////////////////////////////////
// WORKSPACE CLEANUP
/////////////////////////////////

runTask('Configuring workspace', () => {

	// Clear contents of folder only
	[Folders.PLATFORMS, Folders.PLUGINS].forEach(folder => {
		if (existsSync(folder)) {
			readdirSync(folder).forEach(target => rmdirSync(resolve(folder, target)));
		}
	});

	// Ensure folder exists
	if (!existsSync(Folders.WWW)) {
		mkdirSync(Folders.WWW);
	}
});

/////////////////////////////////
// VERSION MANAGEMENT
/////////////////////////////////

runTask('Configuring environment', () => {

	console.log('App ID:', nodePackage.cordova.name);
	console.log('App Name:', nodePackage.name);
	console.log('App Version:', nodePackage.version);

	const addElement = (target, name, content) => {
		const element = new SubElement(target, name);
		element.text = content;
		return element;
	};

	const addPreference = (name, value, target = root) => {
		const preference = addElement(target, 'preference');
		preference.set('name', name);
		preference.set('value', value);
	};

	// Create a blank config file
	const configFile = resolve(__dirname, 'config.xml');

	const root = new Element('widget');
	root.set('id', nodePackage.cordova.name);
	// TODO - autoincrement version number and tag
	root.set('version', nodePackage.version);

	// Description
	addElement(root, 'name', nodePackage.name);
	addElement(root, 'description', nodePackage.description);

	// Config / Preferences
	addElement(root, 'access').set('origin', 'cdvfile://*');
	addPreference('StatusBarOverlaysWebView', 'true');
	addPreference('AutoHideSplashScreen', 'false');
	addPreference('ShowSplashScreenSpinner', 'false');

	// Save
	writeFileSync(configFile, new ElementTree(root).write({indent: 4}), 'utf-8');

});

/////////////////////////////////
// PLATFORM MANAGEMENT
/////////////////////////////////

const platforms = nodePackage.cordova.platforms || [];
platforms.forEach(platform => {
	runTask(`Installing ${platform}`, () => {
		execSync(`npm run cordova -- platform add ${platform}`, {stdio: 'inherit'});
	});
});

/////////////////////////////////
// PLUGIN MANAGEMENT
/////////////////////////////////

runTask('Configuring plugins', () => {

	if (!existsSync(Folders.PLUGINS)) {
		mkdirSync(Folders.PLUGINS);
	}

	Object.keys(nodePackage.cordova.plugins).forEach(plugin => {
		console.log('Installing plugin from node_modules: ', plugin);
		const source = resolve(__dirname, 'node_modules', plugin);
		if (existsSync(source)) {
			copydirSync(source, `${Folders.PLUGINS}/${plugin}`);
			execSync(`npm run cordova -- plugin add ${plugin}`, {stdio: 'inherit'});
		} else {
			console.error(`ERROR - plugin does not exist. Install with \`npm i -${plugin}\``);
		}
	});

});

/////////////////////////////////
// PERFORMANCE LOGGING
/////////////////////////////////

console.log('\nBuild complete!');

console.log('\nTime taken: ', Math.floor((Date.now() - startTime) / 1000), 'seconds');
timerLog.forEach(log => {
	console.log('--', log.task, ':', Math.floor(log.time / 1000), 'seconds');
});
