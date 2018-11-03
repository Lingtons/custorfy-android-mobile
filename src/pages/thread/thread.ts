import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ThreadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-thread',
  templateUrl: 'thread.html',
})
export class ThreadPage {

  complain : any;
  user : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider ) {
    this.user = authService.logged_user();
  }

  ionViewDidLoad() {
    this.complain = this.navParams.get('complain');
    console.log('complain data' + this.complain);
  }

}
