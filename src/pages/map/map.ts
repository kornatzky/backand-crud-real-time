import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GoogleMaps } from '../../providers/google-maps';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

	@ViewChild('map') mapElement;
    map: any;
 

	constructor(public navCtrl: NavController, public navParams: NavParams, public maps: GoogleMaps) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MapPage');
		this.maps.initMap(this.mapElement.nativeElement);
	}

}
