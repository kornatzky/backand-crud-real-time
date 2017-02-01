import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalMongoDB } from './local-mongo-db';

 
@Injectable()
export class GoogleMaps {
 
    map: any;
    markers: any = [];
 
    constructor(public http: Http, public mongodb: LocalMongoDB) {
		console.log('Hello GoogleMaps Provider');
    }
 
    initMap(mapElement, mapOptions){

	 
	    this.map = new google.maps.Map(mapElement, mapOptions); 
	 
	    google.maps.event.addListenerOnce(this.map, 'idle', () => {
	 
	        this.loadMarkers();
	 
	        google.maps.event.addListener(this.map, 'dragend', () => {
	            this.loadMarkers();
	        });
	 
    	});
 
    }
 
	loadMarkers(){
	 
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
	 
	    this.mongodb.getMarkers(options).subscribe(markers => {
	            this.addMarkers(markers);
	    	});
	 
	}
 
	getMarkers(options){
	 
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');
	 	var url = // 'http://e7ffb9b6.ngrok.io';
	 	'http://localhost:8080';
	    this.http.post(url + '/api/markers', JSON.stringify(options), {headers: headers})
	        .map(res => res.json())
	        .subscribe(markers => {
	
	            this.addMarkers(markers);
	 
	        });
	 
	}
 
	addMarkers(markers){
	 
	    let marker;
	    let markerLatLng;
	    let lat;
	    let lng;
	 
	    markers.forEach((marker) => {
	 
	        lat = marker.loc.coordinates[1];
	        lng = marker.loc.coordinates[0];
	 
	        markerLatLng = new google.maps.LatLng(lat, lng);
	 
	        if(!this.markerExists(lat, lng)){
	 
	            let markerOnMap = new google.maps.Marker({
	                map: this.map,
	                animation: google.maps.Animation.DROP,
	                position: markerLatLng
	            }); 

	            let content = "<h4>" + marker.userId + "</h4>";          
	 
	  			this.addInfoWindow(markerOnMap, content);
	 
	            let markerData = {
	                lat: lat,
	                lng: lng,
	                marker: markerOnMap,
	                data: marker
	            };
	 
	            this.markers.push(markerData);
	 
	        }
	 
	    });
	 
	}

	addInfoWindow(marker, content){
 
	  let infoWindow = new google.maps.InfoWindow({
	    content: content
	  });
	 
	  google.maps.event.addListener(marker, 'click', () => {
	    infoWindow.open(this.map, marker);
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
 
        let R = earthRadius[units || 'miles'];
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