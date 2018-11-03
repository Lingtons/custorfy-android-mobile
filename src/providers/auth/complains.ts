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
export class ComplainProvider {

  public complains: any;
  constructor(public http: HttpClient, private authService: AuthProvider) {
    this.complains = this.loadComplains();

  }

  newComplain(subject : string, body: string, branch_id: string, vendor_id:string) {
    return this.http.post(this.authService.url + 'complains/store',
      {subject:subject, body: body, branch_id: branch_id, vendor_id: vendor_id },
      { headers: new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' }) });
  }


  getComplains() {
    return new Promise(resolve => {
      this.http.get(this.authService.url + 'complains').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  loadComplains() {
    this.getComplains().then(data => {
      this.complains = data['data'].complains;
    });
  }



}
