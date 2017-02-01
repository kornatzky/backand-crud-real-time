import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
 
declare var Connection;
 
@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
  disconnectSubscription: any;
  connectSubscription: any;

 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }

 //  subscribeConnection() {
 //  	// watch network for a disconnect
	// this.disconnectSubscription = Network.onDisconnect();
	// return this.disconnectSubscription;
 //  }

 //  subscribeDisconnection(){ 
	// // watch network for a connection
	// this.connectSubscription = Network.onConnect();
	// return this.connectSubscription;
 //  }

 //  unsubscribe(){
 //  	// stop disconnect watch
	// this.disconnectSubscription.unsubscribe();
	// // stop connect watch
	// this.connectSubscription.unsubscribe();
 //  }
 
  isOnline(): boolean {
    if(this.onDevice){
      return Network.type !== 'none';
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice){
      return Network.type === 'none';
    } else {
      return !navigator.onLine;   
    }
  }
}