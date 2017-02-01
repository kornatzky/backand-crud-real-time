import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

import { GoogleMaps } from '../../providers/google-maps';
import { ConnectivityService } from '../../providers/connectivity-service';

declare var google;

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
    mapInitialised: boolean = false;
    apiKey: any;
 

	constructor(public navCtrl: NavController, public navParams: NavParams, public mapService: GoogleMaps, public connectivityService: ConnectivityService) {
		this.loadGoogleMaps();
	}

	loadGoogleMaps() {

		this.addConnectivityListeners();
		
		if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
		    console.log("Google maps JavaScript needs to be loaded.");
		    this.disableMap();
		 
		    if(this.connectivityService.isOnline()){
		      console.log("online, loading map");
		 
		      //Load the SDK
		      window['mapInit'] = () => {
		        this.initMap();
		        this.enableMap();
		      }
		 
		      let script = document.createElement("script");
		      script.id = "googleMaps";
		 
		      if(this.apiKey){
		        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
		      } else {
		        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
		      }
		 
		      document.body.appendChild(script);  
		 
		    } 
	    }
	    else {
		 
		    if(this.connectivityService.isOnline()){
		      console.log("showing map");
		      this.initMap();
		      this.enableMap();
		    }
		    else {
		      console.log("disabling map");
		      this.disableMap();
		    }
		 
		}
	}

    addConnectivityListeners(){
 
	    let onOnline = () => {
	 
	      setTimeout(() => {
	        if(typeof google == "undefined" || typeof google.maps == "undefined"){
	 
	          this.loadGoogleMaps();
	 
	        } else {
	 
	          if(!this.mapInitialised){
	            this.initMap();
	          }
	 
	          this.enableMap();
	        }
	      }, 2000);
	 
	    };
	 
	    let onOffline = () => {
	      this.disableMap();
	    };
	 
	    document.addEventListener('online', onOnline, false);
	    document.addEventListener('offline', onOffline, false);
	 
    }

	initMap(){
	 
	    this.mapInitialised = true;
	 
	    Geolocation.getCurrentPosition().then((position) => {
	 
	      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	 
	      let mapOptions = {
	        center: latLng,
	        zoom: 10,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	      }
	 
	 	  this.mapService.initMap(this.mapElement.nativeElement, mapOptions);

	    }, (err) => {
	      console.log(err);
	    });
	 
	}
 
	disableMap(){
	    console.log("disable map");
	}
	 
	enableMap(){
	    console.log("enable map");
	}

}
