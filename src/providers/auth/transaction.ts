import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from './auth';
import 'rxjs/add/operator/map';
/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {
  
  public transactions: any;
  constructor(public http: HttpClient, private authService: AuthProvider) {
    this.transactions = this.loadTransactions();

  }


  getTransactions() {
    return new Promise(resolve => {
      this.http.get(this.authService.url + 'transactions').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  loadTransactions() {
    this.getTransactions().then(data => {
      this.transactions = data['data'].transactions;
    });
  }

  searchTransactions(searchTerm) {

    if (searchTerm && searchTerm.trim() != '') {
      this.transactions = this.transactions.filter((transaction) => {
        return ((transaction.transaction_code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
          (transaction.created_at.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
          (transaction.customer_payable.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
        )
      })

    } else {
      this.transactions = this.loadTransactions();
    }

    return this.transactions;

  }

}
