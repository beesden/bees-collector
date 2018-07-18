#!/bin/bash -e

# Clear workspace
echo "Clearing workspace..."
rm -rf dist
docker-compose down

# Build cordova app
docker-compose up ionic
docker-compose up cordova
docker-compose up android_debug
echo "todo ios build"

echo "Deploying debug to device..."
adb install -d -r dist/android/debug/app-debug.apk

# Clear containers
echo "Clearing containers..."
docker-compose down
