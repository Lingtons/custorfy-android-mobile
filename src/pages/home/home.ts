import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TransactionProvider } from '../../providers/auth/transaction';
import { ToastService } from '../../services/toast-service';
import { TransactionDetailPage } from '../transaction-detail/transaction-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  transactions: any;
  searchTerm: string = '';
  constructor(public navCtrl: NavController, private authService: AuthProvider, private transactionService: TransactionProvider, private toastCtrl: ToastService, public ev : Events) {
    this.transactions = this.setSearchedTransactions();

  }


  loadTransactions() {
    this.transactionService.getTransactions()
      .then(data => {
        this.transactions = data['data'].transactions;
      });
  }

  setSearchedTransactions() {
    if (this.searchTerm != '') {
      this.transactions = this.transactionService.searchTransactions(this.searchTerm);
    } else {
      this.transactions = this.loadTransactions();
    }
  }

  doRefresh(refresher) {

    setTimeout(() => {
      this.loadTransactions();

      this.toastCtrl.presentToast("Request completed");
      refresher.complete();
    }, 5000);
  }

  viewTransaction(transaction){
    this.navCtrl.push(TransactionDetailPage, {transaction: transaction});
  }

  ionViewCanEnter() {
    return this.authService.isLoginSubject.value;
  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }


}
