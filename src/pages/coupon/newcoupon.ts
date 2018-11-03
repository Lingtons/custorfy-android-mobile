import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from '../../services/alert-service';
import { AuthProvider } from '../../providers/auth/auth';
import { SelectService } from '../../services/select-service';
import { CouponProvider } from '../../providers/auth/coupons';
import { CouponPage } from '../../pages/coupon/coupon';


/**
 * Generated class for the CouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-newcoupon',
  templateUrl: 'newcoupon.html',
})
export class NewCouponPage {
  public vendors: any;
  public branches: any;
  loading: any;

  public selectedBranches: any[];

  public sVendor: any;
  public sBranch: any;
  private user : any;

  couponForm: FormGroup;
  amount: AbstractControl;
  vendor: AbstractControl;
  branch: AbstractControl;


  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider, private selectService: SelectService, public formBuilder: FormBuilder, private alertCtrl: AlertService, public loadingCtrl: LoadingController,  private couponService: CouponProvider, public ev : Events) {

    this.vendors = selectService.vendors;
    this.branches = selectService.branches;
    this.user = authService.logged_user();

    this.couponForm = formBuilder.group({
      amount: ['', Validators.compose([Validators.required])],
      vendor: ['', Validators.compose([Validators.required])],
      branch: ['', Validators.compose([Validators.required ])],
    });


  }

  couponPage(){
    this.navCtrl.setRoot(CouponPage);
  }

  setBranchValues(sVendor) {
    this.selectedBranches = this.branches.filter(branch => branch.vendor_id == sVendor.id)
  }


  ionViewCanEnter() {
    return this.authService.isLoginSubject.value;
  }


  onSubmit(value: any): void {
    if (this.couponForm.valid) {

//      this.showLoader();

  if(value.amount > this.user.point){
    this.alertCtrl.presentAlert("Amount is too high !");

  }else{

    this.showLoader();

    this.couponService.newCoupon(value.amount, value.branch.id, value.vendor.id)
    .subscribe(
      response => {
        this.loading.dismiss();

        let res = response['data'];
        console.log(res.message);
        this.alertCtrl.presentAlert(res.message);
        this.navCtrl.setRoot(CouponPage);

      },
      error => {
        this.loading.dismiss();
        let err = error['error'];
        console.log(err);
        //this.alertCtrl.errorAlert(err.error.message);

        let messageObj = JSON.parse(err.error.message);
         var keys = Object.keys(messageObj);
         var errMsg = messageObj[keys[0]][0];
         this.alertCtrl.presentAlert(errMsg);

      }
    );
  }
    }
  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Processing...'
    });

    this.loading.present();

  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }


}
