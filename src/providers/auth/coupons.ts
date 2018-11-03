import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from './auth';
import 'rxjs/add/operator/map';
/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CouponProvider {

  public coupons: any;
  constructor(public http: HttpClient, private authService: AuthProvider) {
    this.coupons = this.loadCoupons();

  }

  newCoupon(value : number, branch_id: number, vendor_id:number) {
    return this.http.post(this.authService.url + 'coupons/store',
      {value:value, branch_id: branch_id, vendor_id: vendor_id },
      { headers: new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' }) });
  }

  getCoupons() {
    return new Promise(resolve => {
      this.http.get(this.authService.url + 'coupons').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  loadCoupons() {
    this.getCoupons().then(data => {
      this.coupons = data['data'].coupons;
    });
  }



}
