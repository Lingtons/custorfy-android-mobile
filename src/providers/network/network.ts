//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { ToastService } from '../../services/toast-service';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var Connection;
@Injectable()
export class NetworkProvider {
  onDevice: boolean;
  toastAlert: any;



  constructor(public platform: Platform, private network: Network, private toastCtrl: ToastService) {
    this.onDevice = this.platform.is('cordova');
  }

  startWatchingConnection() {

    this.network.onDisconnect().subscribe(() => {
      this.alertOffline();
    });

    /*     this.network.onConnect().subscribe(() => {                  
          this.alertOffline();
             
        });  */
  }

  alertOffline() {
    //this._shared.Toast.show('No Connection', null, 'bottom', true, 'Ok');
    this.toastCtrl.presentToast('No Connection');
  }

  isOnline(): boolean {
    console.log(this.network.type);

    if (this.onDevice && this.network.type) {
      return this.network.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }

  }

}
