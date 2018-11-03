import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ReferralProvider } from '../../providers/auth/referral';
import { ToastService } from '../../services/toast-service';



/**
 * Generated class for the ReferralsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-referrals',
  templateUrl: 'referrals.html',
})
export class ReferralsPage {
  referrals: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider, private referralService: ReferralProvider, private toastCtrl: ToastService, public ev : Events) {
    this.referrals = this.loadReferrals();
  }

  loadReferrals() {
    this.referralService.getReferrals()
      .then(data => {
        this.referrals = data['data'].referrals;
      });
  }


  doRefresh(refresher) {

    setTimeout(() => {
      this.loadReferrals();

      this.toastCtrl.presentToast("Request completed");
      refresher.complete();
    }, 5000);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferralsPage');
  }

  ionViewCanEnter() {
    return this.authService.isLoginSubject.value;
  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

}
