import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { VendorProvider } from '../providers/auth/vendor';

@Injectable()
export class SelectService {
  public vendors: any[];
  public branches: any[];
  public cities: any[];

  public selectedBranches: any[];
  public selectedCities: any[];

  public sVendor: any;
  public sBranch: any;

  constructor(private toastCtrl: ToastController, private vendorService: VendorProvider) {
    this.initializeVendors();
    this.initializeBranches();
    this.initializeCity();
  }

  initializeVendors() : any {
    this.vendorService.fetchVendors()
    .then(data => {
      this.vendors = data['data'].vendors;

    });

  }

  initializeBranches() : any {
    this.vendorService.fetchBranches()
    .then(data => {
      this.branches = data['data'].branches;

    });
  }

  initializeCity() {
    this.cities = [
      { id: 1, name: 'City of Alor Gajah 1', state_id: 1, district_id: 1 },
      { id: 2, name: 'City of Alor Gajah 2', state_id: 1, district_id: 1 },
      { id: 3, name: 'City of Jasin 1', state_id: 1, district_id: 2 },
      { id: 4, name: 'City of Muar 1', state_id: 2, district_id: 3 },
      { id: 5, name: 'City of Muar 2', state_id: 2, district_id: 3 },
      { id: 6, name: 'City of Segamat 1', state_id: 2, district_id: 4 },
      { id: 7, name: 'City of Shah Alam 1', state_id: 3, district_id: 5 },
      { id: 8, name: 'City of Klang 1', state_id: 3, district_id: 6 },
      { id: 9, name: 'City of Klang 2', state_id: 3, district_id: 6 }
    ];
  }



}
