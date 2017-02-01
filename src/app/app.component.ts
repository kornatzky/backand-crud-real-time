import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { BackandService } from '@backand/angular2-sdk';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MapPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private backand: BackandService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Map', component: MapPage },
      { title: 'Login', component: LoginPage },
      { title: 'Sign Up', component: SignupPage }
    ];

    // backand.init({
    //     appName: 'bacakandcrudrealtime',
    //     signUpToken: 'b2005aa4-de6e-47c0-a978-9afbe7ff36a4',
    //     anonymousToken: '6c7b5327-9e2a-4626-bb92-b7255b071810',
    //     runSocket: true,
    //     isMobile: platform.is('mobile')
    // });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
