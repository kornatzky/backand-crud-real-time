import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { BackandDB } from '../providers/backand-db';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MapPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public backand: BackandDB) {
    this.initializeApp();

    if (this.backand.isAuthenticated()){
      this.pages = [
        { title: 'Map', component: MapPage },
        { title: 'Logout', component: LoginPage }
      ];
    }
    else {
        this.pages = [
          { title: 'Map', component: MapPage },
          { title: 'Login', component: LoginPage },
          { title: 'Sign Up', component: SignupPage }
        ];
    }


    this.backand.listenAuthenticationEvents().subscribe(
        data => {
          if (this.backand.isAuthenticated()){
            this.pages = [
              { title: 'Map', component: MapPage },
              { title: 'Logout', component: LoginPage }
            ];
          }
          else {
              this.pages = [
                { title: 'Map', component: MapPage },
                { title: 'Login', component: LoginPage },
                { title: 'Sign Up', component: SignupPage }
              ];
          }
        },

        err => {
          console.log(err);
        }
      );
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
