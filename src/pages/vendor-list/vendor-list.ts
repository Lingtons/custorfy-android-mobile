import { Component } from '@angular/core';
import {NavController, NavParams, Events } from 'ionic-angular';
import { VendorProvider } from '../../providers/auth/vendor';
import { VendorDetailPage } from '../vendor-detail/vendor-detail';

/**
 * Generated class for the VendorListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-list',
  templateUrl: 'vendor-list.html',
})
export class VendorListPage {
  vendors: any;
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private vendorService: VendorProvider, public ev : Events) {
    this.vendors = this.setSearchedVendors();
  }

  loadVendors() {
    this.vendorService.getVendors()
      .then(data => {
        this.vendors = data['data'].vendors;
      });
  }

  setSearchedVendors() {
    if (this.searchTerm != '') {
      this.vendors = this.vendorService.searchVendors(this.searchTerm);
    } else {
      this.vendors = this.loadVendors();
    }
  }

  viewVendor(vendor){
    this.navCtrl.push(VendorDetailPage, {vendor: vendor});
  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

}
