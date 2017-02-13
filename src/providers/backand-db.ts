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

	isUserLoggedIn: boolean = false;
	backandConfig: any;


	constructor(public http: Http, public platform: Platform, private backand: BackandService) {
	    console.log('Hello BackandDB Provider');
	    this.backandConfig = {
	        appName: 'backandcrudrealtime',
	        signUpToken: '9d675688-c4df-41aa-89c2-81afa68931df',
	        anonymousToken: '6c7b5327-9e2a-4626-bb92-b7255b071810',
	        runSocket: true,
	        isMobile: platform.is('mobile'),
	        useAnonymousTokenByDefault: true
	    };
	    this.backand.init(this.backandConfig);
	    this.isLoggedIn().subscribe(
	    	data => {
	    		this.isUserLoggedIn = data;
	    	}, 
	    	err => {
	    		this.isUserLoggedIn = false;
	    	}
	    );
	    this.backand.on('markersCreate', function(data){
	    	console.log(data);
	    });
	}

	isAuthenticated(): boolean {
		return this.isUserLoggedIn;
	}


	getMarkers(options): Observable<any> {   
		let filter = {
			"q": { 
				"loc":  { 
					"$withinKilometers": [[options.lat, options.lng], options.maxDistance] 
				}
			}
	    };
	 
	    return Observable.fromPromise(this.backand.object.getList('markers', { filter: filter }));
	}

	createMarker(marker): Observable<any> {
		return Observable.fromPromise(this.backand.object.create('markers', marker));
	}

	updateMarker(id, marker): Observable<any> {
		return Observable.fromPromise(this.backand.object.update('markers', id, marker));
	}

	signin(authenticationDetails: any): Observable<any>  {
		return Observable.fromPromise(this.backand.signin(authenticationDetails.username, authenticationDetails.password));
	}

	signout(): Observable<any>  {
		return Observable.fromPromise(this.backand.signout());
	}

	signup(userDetails: any): Observable<any>  {
		return Observable.fromPromise(this.backand.signup(userDetails.firstName, userDetails.lastName, userDetails.username, userDetails.signUpPassword, userDetails.confirmPassword));
	}

	socialSignin(provider: string): Observable<any>  {
		return Observable.fromPromise(this.backand.socialSignin(provider));
	}

	on(eventName: string, callback?: (data?: any) => void)  {
		this.backand.on(eventName, callback);
	}

	getOneMarker(id: string): Observable<any> {
		return Observable.fromPromise(this.backand.object.getOne('markers', id));
	} 

	isLoggedIn(): Observable<any> {
		return Observable.fromPromise(this.backand.user.getUserDetails()).map((response:any) => { 
			console.log(response);
			return response.data ? true : false; 
		});
	}

	listenAuthenticationEvents(): Observable<any> {
		let obs: Observable<any> = Observable.merge(
			Observable.fromEvent(window, this.backand.constants.EVENTS.SIGNIN),
			Observable.fromEvent(window, this.backand.constants.EVENTS.SIGNOUT),
			Observable.fromEvent(window, this.backand.constants.EVENTS.SIGNUP)
		);
		obs.subscribe(
			data => {
				switch(data.eventName)
				{
					case this.backand.constants.EVENTS.SIGNIN:
						this.isUserLoggedIn = true;
					break;

					case this.backand.constants.EVENTS.SIGNOUT:
						this.isUserLoggedIn = false;
					break;

					case this.backand.constants.EVENTS.SIGNUP:
						if (this.backandConfig.runSigninAfterSignup){
							this.isUserLoggedIn = true;
						}
					break;
				}
			}, 
			err => {

			}
		);
		return obs;
	}

}
