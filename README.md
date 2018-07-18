# Collections app

This app is designed for organising and tracking collections.

## Building

### Prerequisites: 

* Install [Docker CE](https://docs.docker.com/install/)
* For iOS builds, a mac is required with xCode `xcode-select --install`

### Components

Since a Cordova build is somewhat temperamental, and to prevent dependencies getting mixed up, the build is broken up into four components.

The main advantage of this is that each component of the build can be tested and built in isolation.

A sample set of build instructions to install the android debug app to a device might be:

```
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

```

#### 1. Ionic Front-End

```
# Command: 
docker-compose up ionic
```

The Ionic' app is the front-end of the mobile app. 

Note that while Ionic components and plugins are used, the build is actually handled by the more advanced Angular CLI. 

*TODO - need to add local environment with mocks*

#### 2. Cordova platforms

```
# Command: 
docker-compose up cordova
```

Once the Ionic App is assembled, the Cordova build step fetches the Cordova iOS and Android platforms and installs necessary plugins.

Unlike traditional Cordova builds which use stores almost the same data across `package.json` and `config.xml`, the entire configuration is saved into the package.json and a fresh config.xml is generated on every build. This forces the package.json to be the single source of truth for versioning and configuration information.

#### 3. Android

```
# Command: 
docker-compose up android_debug
docker-compose up android_release
```

Once the Cordova platforms are built, the Android APKs are built using gradle commands. The output of this is saved in the `dist` folder.

##### Local testing

While the app can be completely built through containers, the following needs to be run in order to run the app on a device:

###### Windows

1. Download [ADB](https://dl.google.com/android/repository/platform-tools-latest-windows.zip) and install. Easiest step is to add to the $PATH in System Preferences.
2. Plug the Android device in and ensure developer mode is enabled.
3. Run the following command to install the debug APK: `adb install -r dist/android/debug/app-debug.apk`

###### Linux / Mac

Grant the docker access to the USB device and run this instead of the docker-compose up command.

```
docker run -ti -rm -v /dev/bus/usb:/dev/bus/usb android_debug gradle installDebug
```

##### Releasing

*TODO*

#### 4. iOS

```
# Command: 
docker-compose up ios
```

Since the iOS builds require an OSX and xCode development environment, the build isn't added yet. 

*TODO*

##### Releasing

*TODO*
