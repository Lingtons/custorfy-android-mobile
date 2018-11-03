import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewcouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-viewcoupon',
  template: `
  <ion-header>

    <ion-navbar padding no-border-bottom>
      <ion-title>{{lesson?.title}}</ion-title>
      <ion-buttons end>
    <button ion-button icon-only (click) = "closeModal()" ><ion-icon name = "close"></ion-icon> </button>
    </ion-buttons>
    </ion-navbar>

  </ion-header>


  <ion-content no-padding margin-top>
    <ion-item-divider sticky>
  <label>{{coupon?.voucher}}</label>
  </ion-item-divider>



  <p padding>This coupon is only useable at</p>
  <ion-grid border>
  <ion-row>
  <ion-col>
      <strong>Code:</strong>
  </ion-col>
  <ion-col col-8>
      {{coupon?.voucher}}
  </ion-col>
</ion-row>
  <ion-row>
  <ion-col>
      <strong>Amount:</strong>
  </ion-col>
  <ion-col col-8>
      {{coupon?.value | number}}
  </ion-col>
</ion-row>
  <ion-row>
      <ion-col>
          <strong>Vendor:</strong>
      </ion-col>
      <ion-col col-8>
          {{coupon?.vendor?.name}}
      </ion-col>
  </ion-row>
  <ion-row>
      <ion-col>
          <strong>Branch:</strong>
      </ion-col>
      <ion-col col-8>
         {{coupon?.branch?.address}}
      </ion-col>
  </ion-row>
  <ion-row>
  <ion-col>
      <strong>Validity:</strong>
  </ion-col>
  <ion-col col-8>
     {{coupon?.used == 0 ? 'unused' : 'used'}}
  </ion-col>
</ion-row>
</ion-grid>

  </ion-content>
  `,
})
export class ViewcouponPage {
coupon : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.coupon  = this.navParams.get('coupon');

  }

  closeModal(){

    this.viewCtrl.dismiss();

    }

}
