import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CardPage } from '../pages/card/card';

import { GoogleMaps } from '../providers/google-maps';

import { BackandService } from '@backand/angular2-sdk';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    LoginPage,
    SignupPage,
    CardPage
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
    CardPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GoogleMaps, BackandService]
})
export class AppModule {}
