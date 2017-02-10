import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandDB } from '../../providers/backand-db';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  authenticationDetails: any = {};
  isLoggedIn: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandDB) {
    this.isLoggedIn = this.backand.isAuthenticated();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submitLogin() {
  	console.log("submitLogin", this.authenticationDetails);
  	
  	this.backand.signin(this.authenticationDetails).subscribe(
    	data => {
    	    console.log(data);
          this.authenticationDetails = {};
    	},
    	err => {
    		console.log(err);	
    	});
  }

  socialSignin(provider) {
  	console.log("socialSignin", provider);
  	
  	this.backand.socialSignin(provider).subscribe(
    	data => {
    	    console.log(data);
          this.authenticationDetails = {};
    	},
    	err => {
    		console.log(err);	
    	});
  }

  submitLogout() {

      console.log("submitLogout");

      
      this.backand.signout().subscribe(
        data => {
            console.log(data);
            this.authenticationDetails = {};
            this.isLoggedIn = false;
        },
        err => {
          console.log(err);  
        });
    }

}
