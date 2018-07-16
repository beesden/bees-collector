#!/usr/bin/env node

const {execSync} = require('child_process');
const {ConfigParser} = require('cordova-common');
const {existsSync, mkdirSync, writeFileSync} = require('fs');
const {resolve} = require('path');
const {copySync: copydirSync} = require('fs-extra');
const {sync: rmdirSync} = require('rimraf');

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
	rmdirSync(Folders.PLATFORMS);
	rmdirSync(Folders.PLUGINS);
	if (!existsSync(Folders.WWW)) {
		mkdirSync(Folders.WWW);
	}
});

/////////////////////////////////
// VERSION MANAGEMENT
/////////////////////////////////


runTask('Configuring environment', () => {

	// Create a blank config file
	const configFile = resolve(__dirname, 'config.xml');

	writeFileSync(configFile, '<widget></widget>');
	const config = new ConfigParser(configFile);

	console.log('App ID:', nodePackage.cordova.name);
	console.log('App Name:', nodePackage.name);
	console.log('App Version:', nodePackage.version);

	// TODO - autoincrement version number and tag
	config.setPackageName(nodePackage.cordova.name);
	config.setName(nodePackage.name);
	config.setDescription(nodePackage.description);
	config.setVersion(nodePackage.version);
	config.write();

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
		} else {
			console.error(`ERROR - plugin does not exist. Install with \`npm i -${plugin}\``);
		}
	});

});

/////////////////////////////////
// PLATFORM MANAGEMENT
/////////////////////////////////

const platforms = nodePackage.cordova.platforms || [];
platforms.forEach(platform => {
	runTask(`Installing ${platform}`, () => {
		execSync(`npm run cordova -- platform add ${platform}`, {stdio: [0, 1, 2]});
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
