import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { LoginService } from '../../services/login-service';
import { AlertService } from '../../services/alert-service';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    LoginService
  ]
})
export class LoginPage {
  /*  Necessary data and events
      ================================*/
  data: {};
  events: {};
  loading: any;
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: LoginService, public formBuilder: FormBuilder, private authService: AuthProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertService, private menuCtrl : MenuController, private inAppBrowser: InAppBrowser) {
    this.data = this.service.getDataForLoginPage();

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  onSubmit(value: any): void {
    if (this.loginForm.valid) {
      this.showLoader();
      this.authService.signin(value.email, value.password)
        .subscribe(
          response => {
            this.loading.dismiss();

            let res = response['data'];

            this.authService.token = res.token;
            localStorage.removeItem('token');
            localStorage.setItem('token', this.authService.token);
            this.authService.isLoginSubject.next(true);

            if (this.authService.isLoginSubject.value) {
              this.authService.getUser();
              this.navCtrl.setRoot(HomePage);
            }

          },
          error => {
            this.loading.dismiss();
            let err = error['error'];
            this.alertCtrl.errorAlert(err.error.message);

            /*  let messageObj = JSON.parse(err.error.message);
             //console.log(err.error.code);
             var keys = Object.keys(m
essageObj);
             var errMsg = messageObj[keys[0]][0];
             this.alertCtrl.presentAlert(errMsg); */

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

  openSignup(){
    this.navCtrl.setRoot(SignupPage);
  }

  recoverPassword() {
    var url = "https://custorfy.com/password/reset";
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes',
      mediaPlaybackRequiresUserAction: 'no'
    }
// Opening a URL and returning an InAppBrowserObject
const browser = this.inAppBrowser.create(url, '_self', options);
}

}
