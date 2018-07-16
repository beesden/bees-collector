# Collections app

This app is designed for organising and tracking collections.

## Building

### Prerequisites: 

* Install [Docker CE](https://docs.docker.com/install/)
* For iOS builds, a mac is required with xCode `xcode-select --install`

### Components

Since a Cordova build is somewhat temperamental, and to prevent dependencies getting mixed up, the build is broken up into four components.

The main advantage of this is that each component of the build can be tested and built in isolation.

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

*TODO - android release APK*

#### 4. iOS

```
# Command: 
docker-compose up ios
```

Since the iOS builds require an OSX and xCode development environment, the build isn't added yet. 

*TODO - ios build*

## Releasing

*TODO*
