# Description

An example app for Backand AngularJS SDK with CRUD and real-time update.

**NOTE: Compatible with Ionic 3.1.2**

#  App Flow

Opens with Map screen showing all users currently tracked. 

Whenever a user location changes, the markers on the map will be dynamically updated.

Clicking a marker, opens the user card screen.

Now we can upload an image for the user, to replace his/her current upload picture. Anyone currenly viewing the usedr card will immediately see the new update

# Sign Up/Login

* Email and password
* Facebook

# Signout

Enable signout in Backand. In your app go to `Security` > `Configuration`, and click `Enable sign-out API`.

# Dynamic Update of Screens

The side menu updates its content based on authentication events. The login screens becomes the logout screen when the user is logged in.

# Ionic Native Plugins

## Geolocation Plugin

    ionic cordova plugin add cordova-plugin-geolocation 

## Cordova Network Information Plugin

    ionic cordova plugin add cordova-plugin-network-information

## Cordova Plugin In App Browser

    ionic cordova plugin add cordova-plugin-inappbrowser@1.7.1 --save

# Splash Screen

    ionic cordova plugin add cordova-plugin-splashscreen

# Status Bar

    ionic cordova plugin add cordova-plugin-statusbar

# Working with Backand

## Provider

We construct a provider `BackandDB` that wraps the [Backand Angular JS 2 SDK](https://github.com/backand/angular2-sdk). In the provider constructor we initialise the SDK, 

    this.backandConfig = {
        appName: 'backandcrudrealtime',
        signUpToken: '9d675688-c4df-41aa-89c2-81afa68931df',
        anonymousToken: '6c7b5327-9e2a-4626-bb92-b7255b071810',
        runSocket: true,
        isMobile: platform.is('mobile'),
        useAnonymousTokenByDefault: true
    };
    backand.init(this.backandConfig);

## Model

We have a single object `markers` whose model is:

    {
        "name": "markers",
        "fields": {
          "userId": {
            "type": "string"
          },
          "loc": {
            "type": "point"
          },
          "timestamp": {
            "type": "datetime"
          }
    }

## Observables
The SDK works with promises and in the provider we make it into an observable, like this:

    getMarkers(options): Observable<any> {      
        return Observable.fromPromise(this.backand.object.getList('markers'));
    }

and subscribe to it in other providers or in pages, like this:

    this.backand.getMarkers(options).subscribe(
            markers => {
                console.log(markers);
            },
            err => {
                console.log(err);   
            });

## Authentication

The provider has a flag `isUserLoggedIn`.

We listen to authentication events, and construct a merged observable:

    let obs: Observable<any> = Observable.merge(
        Observable.fromEvent(window, this.backand.constants.EVENTS.SIGNIN),
        Observable.fromEvent(window, this.backand.constants.EVENTS.SIGNOUT),
        Observable.fromEvent(window, this.backand.constants.EVENTS.SIGNUP)
    );

listen to it, and update the flag. 

We provide the observable via the function `listenAuthenticationEvents`, to components such as pages that would like to modify their presentation and behavior on such events.

## Socket

Create a real time action in Backand. 
If such an action, for instance, emits the event 'markersCreate', then we can listen for the event with:

    this.backand.on('markersCreate', function(data){
        // do something with data
    });

As in the function `on` in `src/providers/backand-db.ts`.

# References

[Ionic 2: How to Use Google Maps & Geolocation](https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/)

[Dynamically Loading Markers with MongoDB in Ionic 2 – Part 1](https://www.joshmorony.com/dynamically-loading-markers-with-mongodb-in-ionic-2-part-1/)

[Dynamically Loading Markers with MongoDB in Ionic 2 – Part 2](https://www.joshmorony.com/dynamically-loading-markers-with-mongodb-in-ionic-2-part-2/)

[Creating an Advanced Google Maps Component in Ionic 2](https://www.joshmorony.com/creating-an-advanced-google-maps-component-in-ionic-2/)