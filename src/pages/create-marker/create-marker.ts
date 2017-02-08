import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandDB } from '../../providers/backand-db';
import * as moment from 'moment';

/*
  Generated class for the CreateMarker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-marker',
  templateUrl: 'create-marker.html'
})
export class CreateMarkerPage {

  marker: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandDB) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMarkerPage');
  }

  submitMarker() {
  	console.log("submitMarker", this.marker);
  	let data = {
  		userId: this.marker.userId,
  		loc: [Number.parseFloat(this.marker.latitude), Number.parseFloat(this.marker.longitude)],
  		timestamp: moment(this.marker.date + ' ' + this.marker.time).format('YYYY-MM-DDTHH:mm:ss')
  	};
    console.log(data);
  	this.backand.createMarker(this.marker).subscribe(
    	data => {
    	    console.log(data);
    	},
    	err => {
    		console.log(err);	
    	});
  }

}
