import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from './auth';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VendorProvider {
  vendors: any;

  constructor(public http: HttpClient, private authService:AuthProvider) {
    this.vendors = this.loadVendors();
  }

  getVendors() {
    return new Promise(resolve => {
      this.http.get(this.authService.url + 'vendors').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  loadVendors() {
    this.getVendors().then(data => {
      this.vendors = data['data'].vendors;
    });
  }

  searchVendors(searchTerm) {

    if (searchTerm && searchTerm.trim() != '') {
      this.vendors = this.vendors.filter((vendor) => {
        return ((vendor.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
          (vendor.contact.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
          (vendor.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
        )
      })

    } else {
      this.vendors = this.loadVendors();
    }
    return this.vendors;
  }

  //select functions

  fetchVendors() {
    return new Promise(resolve => {
      this.http.get(this.authService.url + 'fetchvendors').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  fetchBranches() {
    return new Promise(resolve => {
      this.http.get(this.authService.url + 'fetchbranches').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

}
