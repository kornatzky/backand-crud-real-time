import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';

import { BackandDB } from './backand-db';



 
@Injectable()
export class GoogleMaps {
 
    map: any;
    markers: any = [];
 
    constructor(public http: Http, public backand: BackandDB, public events: Events) {
		console.log('Hello GoogleMaps Provider');
		this.markers = [];
    }
 
    initMap(mapElement, mapOptions){

	 
	    this.map = new google.maps.Map(mapElement, mapOptions); 
	 
	    google.maps.event.addListenerOnce(this.map, 'idle', () => {
	 
	        this.loadMarkers();
	 
	        google.maps.event.addListener(this.map, 'dragend', () => {
	            this.loadMarkers();
	        });

	        var that = this;

	        this.backand.on('markersCreate', function(data) {
	        	that.loadMarkers();
	        });
		 
    	});
 
    }
 
	loadMarkers(){
		// if (this.backand.isAuthenticated()) 
		{
				
				

				let center = this.map.getCenter(),
			        bounds = this.map.getBounds(),
			        zoom = this.map.getZoom();
			 
			    // Convert to readable format
			    let centerNorm = {
			        lat: center.lat(),
			        lng: center.lng()
			    };
			 
			    let boundsNorm = {
			        northEast: {
			            lat: bounds.getNorthEast().lat(),
			            lng: bounds.getNorthEast().lng()
			        },
			        southWest: {
			            lat: bounds.getSouthWest().lat(),
			            lng: bounds.getSouthWest().lng()
			        }
			    };
			 
			    let boundingRadius = this.getBoundingRadius(centerNorm, boundsNorm);
			 
			    let options = {
			        lng: centerNorm.lng,
			        lat: centerNorm.lat,
			        maxDistance: boundingRadius
			    }
			 
			    this.backand.getMarkers(options).subscribe(
			    	markers => {
			    	    console.log(markers);
			            this.addMarkers(markers.data);
			    	},
			    	err => {
			    		console.log(err);	
			    	});
		} 
	}
 
	addMarkers(markers){
	 
	    let marker;
	    let markerLatLng;
	    let lat;
	    let lng;
	 
	    markers.forEach((marker) => {
	 
	        lat = marker.loc[0];
	        lng = marker.loc[1];
	 
	        markerLatLng = new google.maps.LatLng(lat, lng);
	 
	        if(!this.markerExists(lat, lng)){
	 
	            let markerOnMap = new google.maps.Marker({
	                map: this.map,
	                animation: google.maps.Animation.DROP,
	                position: markerLatLng
	            }); 

	            let content = "<h4 (click)='markerClicked(marker.userId)'>" + marker.userId + "</h4>";          

	            let markerData = {
	                lat: lat,
	                lng: lng,
	                marker: markerOnMap,
	                data: marker
	            };

	  			this.addInfoWindow(markerOnMap, content, markerData);
	 

	 
	            this.markers.push(markerData);
	 
	        }
	 
	    });
	 
	}

	markerClicked(id: string){
		this.events.publish('markerClicked', id);
	}
	

	addInfoWindow(marker: any, content: string, markerData: any){
 
	  let infoWindow = new google.maps.InfoWindow({
	    content: content
	  });
	 
	  google.maps.event.addListener(marker, 'click', () => {
	    infoWindow.open(this.map, marker);
	    this.markerClicked(markerData.data.id);
	  });
	 
	}
 
	markerExists(lat, lng){
	 
	    let exists = false;
	 
	    this.markers.forEach((marker) => {
	        if(marker.lat === lat && marker.lng === lng){
	            exists = true;
	        }
	    });
	 
	    return exists;
	 
	}
 
    getBoundingRadius(center, bounds){
        return this.getDistanceBetweenPoints(center, bounds.northEast, 'km');    
    }
 
    getDistanceBetweenPoints(pos1, pos2, units){
 
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'km'];
        let lat1 = pos1.lat;
        let lon1 = pos1.lng;
        let lat2 = pos2.lat;
        let lon2 = pos2.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
 
        return d;
 
    }
 
    toRad(x){
        return x * Math.PI / 180;
    }
 
}