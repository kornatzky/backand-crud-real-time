import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandDB } from '../../providers/backand-db';

/*
  Generated class for the Card page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-card',
  templateUrl: 'card.html'
})
export class CardPage {

  id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandDB) {
  	this.id = this.navParams.get('id');
  	console.log(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
    this.backand.getOneMarker(this.id).subscribe(
	    	data => {
	    	    console.log(data);
	    	},
	    	err => {
	    		console.log(err);	
	    	});
  }

}
