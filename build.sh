#!/usr/bin/env bash

rm -rf dist

docker-compose up ionic
docker-compose up cordova
docker-compose up android_debug
docker-compose up android_release
