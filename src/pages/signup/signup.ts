import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandDB } from '../../providers/backand-db';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

	userDetails: any = {};

    constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandDB) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}

	submitSignup() {
	  	console.log("submitSignup", this.userDetails);
	  	
	  	this.backand.signup(this.userDetails).subscribe(
	    	data => {
	    	    console.log(data);
	    	},
	    	err => {
	    		console.log(err);	
	    	});
	}

}
