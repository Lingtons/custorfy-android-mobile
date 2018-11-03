import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CouponProvider } from '../../providers/auth/coupons';
import { NewCouponPage } from '../../pages/coupon/newcoupon';
import { ViewcouponPage } from '../../pages/viewcoupon/viewcoupon';


/**
 * Generated class for the CouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html',
})
export class CouponPage {

  coupons : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider, private couponService: CouponProvider, public modalCtrl : ModalController, public ev : Events) {
    this.coupons = this.loadCoupons();
  }

  loadCoupons() {
    this.couponService.getCoupons()
      .then(data => {
        this.coupons = data['data'].coupons;
      });
  }

  ionViewCanEnter() {
    return this.authService.isLoginSubject.value;
  }

  //this.nav.setRoot(page.component);

  couponCreatePage(){
    this.navCtrl.setRoot(NewCouponPage);
  }

  viewCoupon(coupon){
    let modal = this.modalCtrl.create(ViewcouponPage, {coupon});
    modal.present();

  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }



}
