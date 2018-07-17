#!/usr/bin/env bash
set -e:

rm -rf dist

# Build cordova app
docker-compose up ionic
docker-compose up cordova

# Build android
docker-compose up android_debug
docker-compose up android_release

# Build ios - TODO
echo todo ios build

docker rm $(docker ps -a -q)
