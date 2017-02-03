# Description

An example app for Backand AngularJS SDK with CRUD and real-time update

#  App Flow

Opens with Map screen showing all users currently tracked. 

Whenever a user location changes, the markers on the map will be dynamically updated.

Clicking a marker, opens the user card screen.

Now we can upload an image for the user, to replace his/her current upload picture. Anyone currenly viewing the usedr card will immediately see the new update

# Sign Up/Login

* Email and password
* Facebook

# Location Tracking 

Continuously in background. Uploaded to server. 

# Ionic Native Plugins

## Geolocation Plugin

    ionic plugin add cordova-plugin-geolocation

## Cordova Network Information Plugin

    ionic plugin add cordova-plugin-network-information

# Working with Backand

We construct a provider `BackandDB` that wraps the [Backand Angular JS 2 SDK](https://github.com/backand/angular2-sdk). In the provider constructor we initialise the SDK, 

    backand.init({
            appName: 'bacakandcrudrealtime',
            signUpToken: 'b2005aa4-de6e-47c0-a978-9afbe7ff36a4',
            anonymousToken: '6c7b5327-9e2a-4626-bb92-b7255b071810',
            runSocket: true,
            isMobile: platform.is('mobile')
        });

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

The SDK works with promises and in the provider we make it into an observable, like this:

    getMarkers(options): Observable<any> {      
        return Observable.fromPromise(this.backand.object.getList('markers'));
    }

and subsctibe to it in other providers or in pages, like this:

    this.backand.getMarkers(options).subscribe(
            markers => {
                console.log(markers);
            },
            err => {
                console.log(err);   
            });

# References

[Ionic 2: How to Use Google Maps & Geolocation](https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/)

[Dynamically Loading Markers with MongoDB in Ionic 2 – Part 1](https://www.joshmorony.com/dynamically-loading-markers-with-mongodb-in-ionic-2-part-1/)

[Dynamically Loading Markers with MongoDB in Ionic 2 – Part 2](https://www.joshmorony.com/dynamically-loading-markers-with-mongodb-in-ionic-2-part-2/)

[Creating an Advanced Google Maps Component in Ionic 2](https://www.joshmorony.com/creating-an-advanced-google-maps-component-in-ionic-2/)