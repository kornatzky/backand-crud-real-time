import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GoogleMaps, BackandService, BackandDB, ConnectivityService]
})
export class AppModule {}
