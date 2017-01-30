import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

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
		Geolocation.getCurrentPosition().then((position) => {
 
	        //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	        let latLng = new google.maps.LatLng(32.0713990, 34.7865760);
	 
	        let mapOptions = {
	          center: latLng,
	          zoom: 5,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        }
	 
	        this.maps.initMap(this.mapElement.nativeElement, mapOptions);
       
 
        }, (err) => {
	      console.log(err);
	    });
		
	}

}
