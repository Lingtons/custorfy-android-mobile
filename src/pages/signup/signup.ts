import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginService } from '../../services/login-service';
import { AlertService } from '../../services/alert-service';
import { AuthProvider } from '../../providers/auth/auth';
//import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [
    LoginService
  ]
})
export class SignupPage {
  /*  Necessary data and events
      ================================*/
      data: {};
      events: {};
      loading: any;
      signupForm: FormGroup;
      email: AbstractControl;
      password: AbstractControl;
      phone: AbstractControl;
      name: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: LoginService, public formBuilder: FormBuilder, private authService: AuthProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertService) {
    this.data = this.service.getDataForLoginPage();

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      name: ['', Validators.compose([Validators.required ])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit(value: any): void {
    if (this.signupForm.valid) {
      this.showLoader();
      console.log(value);
      this.authService.signup(value.name, value.email, value.password, value.phone)
        .subscribe(
          response => {
            this.loading.dismiss();

            let res = response['data'];
            console.log(res.message);
            this.alertCtrl.presentAlert(res.message);
            this.navCtrl.setRoot(LoginPage);

            //this.authService.token = res.token;
            //localStorage.removeItem('token');
            //localStorage.setItem('token', this.authService.token);
            ///this.authService.isLoginSubject.next(true);

/*             if (this.authService.isLoginSubject.value) {
              this.authService.getUser();
              this.navCtrl.setRoot(HomePage);
            } */

          },
          error => {
            this.loading.dismiss();
            let err = error['error'];
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
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  openSignin(){
    this.navCtrl.setRoot(LoginPage);
  }

}
