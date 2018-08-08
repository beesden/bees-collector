#!/bin/bash -e

TIMEFORMAT='Build completed in %R seconds...'

time {

	# Clear workspace
	echo "Clearing workspace..."
	rm -rf dist cordova/config.xml cordova/platforms cordova/plugins
	docker-compose down

	# Build cordova app
	docker-compose up ionic
	docker-compose up cordova
	docker-compose up android_debug
	echo "todo ios build"

	#echo "Deploying debug to device..."
	if adb shell pm list packages | grep com.beesden.collections
	then
		echo "Uninstall previous version..."
		adb uninstall com.beesden.collections
	fi
	echo "Deploying app to device..."
	adb install -d dist/android/debug/app-debug.apk
	adb shell am start -n com.beesden.collections/.MainActivity

	# Clear containers
	echo "Clearing containers..."
	docker-compose down

}
