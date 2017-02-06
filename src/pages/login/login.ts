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

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandDB) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submitLogin() {
  	console.log("submitLogin", this.authenticationDetails);
  	
  	this.backand.signin(this.authenticationDetails).subscribe(
    	data => {
    	    console.log(data);
    	},
    	err => {
    		console.log(err);	
    	});
  }

  socialSignin(provider) {
  	console.log("socialSignin", provider);
  	
  	
  }

}
