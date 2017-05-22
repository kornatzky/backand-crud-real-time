import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

import { BackandService } from '@backand/angular2-sdk';



import { MyApp } from './app.component';

import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CardPage } from '../pages/card/card';
import { CreateMarkerPage } from '../pages/create-marker/create-marker';

import { GoogleMaps } from '../providers/google-maps';
import { ConnectivityService } from '../providers/connectivity-service';
import { BackandDB } from '../providers/backand-db';


@NgModule({
  declarations: [
    MyApp,
    MapPage,
    LoginPage,
    SignupPage,
    CardPage,
    CreateMarkerPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    LoginPage,
    SignupPage,
    CardPage,
    CreateMarkerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    GoogleMaps, 
    BackandService, 
    BackandDB, 
    ConnectivityService
  ]
})
export class AppModule {}
