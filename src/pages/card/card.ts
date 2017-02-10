import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandDB } from '../../providers/backand-db';
import * as moment from 'moment';

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
  marker: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandDB) {
  	this.id = this.navParams.get('id');
  	console.log(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
    this.backand.getOneMarker(this.id).subscribe(
	    	data => {
	    	    console.log(data);
            this.marker = data.data;
            this.marker.latitude = data.data.loc[0];
            this.marker.longitude = data.data.loc[1];
            let dateParts = data.data.timestamp.split('T');
            this.marker.date = dateParts[0];
            this.marker.time = dateParts[1];
	    	},
	    	err => {
	    		console.log(err);	
	    	});
  }

  updateMarker() {
    console.log("updateMarker", this.marker);
    let data = {
      userId: this.marker.userId,
      loc: [Number.parseFloat(this.marker.latitude), Number.parseFloat(this.marker.longitude)],
      timestamp: moment(this.marker.date + ' ' + this.marker.time).format('YYYY-MM-DDTHH:mm:ss')
    };
    console.log(data);
    this.backand.updateMarker(this.id, data).subscribe(
      data => {
        console.log(data);
        alert('update succeeded');
      },
      err => {
        console.log(err);  
        alert('update failed');
      });
  }

}
