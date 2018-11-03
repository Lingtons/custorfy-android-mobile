import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VendorDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-detail',
  templateUrl: 'vendor-detail.html',
})
export class VendorDetailPage {
  vendor : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.vendor = this.navParams.get('vendor');
    console.log('vendor data' + this.vendor.branches);
  }    

}
