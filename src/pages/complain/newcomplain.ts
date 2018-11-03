import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ComplainProvider } from '../../providers/auth/complains';
import { SelectService } from '../../services/select-service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from '../../services/alert-service';
import { ComplainPage } from '../../pages/complain/complain';


/**
 * Generated class for the CouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-newcomplain',
  templateUrl: 'newcomplain.html',
})
export class NewComplainPage {
  public vendors: any;
  public branches: any;

  public selectedBranches: any[];

  public sVendor: any;
  public sBranch: any;

  loading: any;

  complainForm: FormGroup;
  subject: AbstractControl;
  vendor: AbstractControl;
  branch: AbstractControl;
  body: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private authService: AuthProvider, private selectService: SelectService, public loadingCtrl: LoadingController, private alertCtrl: AlertService, private complainService: ComplainProvider, public ev : Events) {

    this.vendors = selectService.vendors;
    this.branches = selectService.branches;

    this.complainForm = formBuilder.group({
      subject: ['', Validators.compose([Validators.required])],
      vendor: ['', Validators.compose([Validators.required])],
      branch: ['', Validators.compose([Validators.required ])],
      body: ['', Validators.compose([Validators.required])]
    });

  }

  complainPage(){
    this.navCtrl.setRoot(ComplainPage);
  }

  setBranchValues(sVendor) {
    this.selectedBranches = this.branches.filter(branch => branch.vendor_id == sVendor.id)
  }


  ionViewCanEnter() {
    return this.authService.isLoginSubject.value;
  }

  onSubmit(value: any): void {
    if (this.complainForm.valid) {
        this.showLoader();

      //this.alertCtrl.presentAlert(value.branch.id);
      this.complainService.newComplain(value.subject, value.body, value.branch.id, value.vendor.id)
        .subscribe(
          response => {
            this.loading.dismiss();

            let res = response['data'];
            console.log(res.message);
            this.alertCtrl.presentAlert(res.message);
            this.navCtrl.setRoot(ComplainPage);

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
