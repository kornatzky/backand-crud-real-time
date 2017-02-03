import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { BackandService } from '@backand/angular2-sdk';

/*
  Generated class for the BackandDB provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BackandDB {

	constructor(public http: Http, public platform: Platform, private backand: BackandService) {
	    console.log('Hello BackandDB Provider');

	    backand.init({
	        appName: 'bacakandcrudrealtime',
	        signUpToken: 'b2005aa4-de6e-47c0-a978-9afbe7ff36a4',
	        anonymousToken: '6c7b5327-9e2a-4626-bb92-b7255b071810',
	        runSocket: true,
	        isMobile: platform.is('mobile')
	    });
	}


	getMarkers(options): Observable<any> {
	    
	    return Observable.fromPromise(this.backand.object.getList('markers'));

	}

}