import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
 
declare var Connection;
 
@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');

    // watch network for a disconnect
	let disconnectSubscription = Network.onDisconnect().subscribe(() => {
	  console.log('network was disconnected :-(');
	});

	// stop disconnect watch
	disconnectSubscription.unsubscribe();


	// watch network for a connection
	let connectSubscription = Network.onConnect().subscribe(() => {
	  console.log('network connected!'); 
	  // We just got a connection but we need to wait briefly
	   // before we determine the connection type.  Might need to wait 
	  // prior to doing any api requests as well.
	  setTimeout(() => {
	    if (Network.type === 'wifi') {
	      console.log('we got a wifi connection, woohoo!');
	    }
	  }, 3000);
	});

	// stop connect watch
	connectSubscription.unsubscribe();
  }
 
  // isOnline(): boolean {
  //   if(this.onDevice && Network.connection){
  //     return Network.connection !== Connection.NONE;
  //   } else {
  //     return navigator.onLine; 
  //   }
  // }
 
  // isOffline(): boolean {
  //   if(this.onDevice && Network.connection){
  //     return Network.connection === Connection.NONE;
  //   } else {
  //     return !navigator.onLine;   
  //   }
  // }
}