import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ComplainProvider } from '../../providers/auth/complains';
import { NewComplainPage } from '../../pages/complain/newcomplain';
import { ThreadPage } from '../../pages/thread/thread';


/**
 * Generated class for the ComplainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-complain',
  templateUrl: 'complain.html',
})
export class ComplainPage {

  complains: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider, private complainService: ComplainProvider, public ev : Events) {
    this.complains = this.loadComplains();
  }

  loadComplains() {
    this.complainService.getComplains()
      .then(data => {
        this.complains = data['data'].complains;
      });
  }

  complainCreatePage() {
    this.navCtrl.setRoot(NewComplainPage);
  }

  ionViewCanEnter() {
    return this.authService.isLoginSubject.value;
  }

  openThread(complain) {

    this.navCtrl.push(ThreadPage, { complain });

  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

}
