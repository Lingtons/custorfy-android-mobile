import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider, public ev : Events) {

  }

  ionViewDidLoad() {
    this.user = this.authService.logged_user();
  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

}
