import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalMongoDB provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalMongoDB {

  constructor(public http: Http) {
    console.log('Hello LocalMongoDB Provider');
  }

  public getMarkers(options){
	 
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');
	 	var url = // 'http://e7ffb9b6.ngrok.io';
	 		'http://localhost:8080';
	    return this.http.post(url + '/api/markers', JSON.stringify(options), {headers: headers})
	        .map(res => res.json());
	        
	 
	}

}
