import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Platform, Events, PopoverController,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NetworkProvider } from '../providers/network/network';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Firebase } from '@ionic-native/firebase';
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { ReferralsPage } from '../pages/referrals/referrals';
import { LoginPage } from '../pages/login/login';
import { VendorListPage } from '../pages/vendor-list/vendor-list';
import { CouponPage } from '../pages/coupon/coupon';
import { ComplainPage } from '../pages/complain/complain';
import { PopoverPage } from '../pages/popover/popover';
import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any, icon: string }>;
  more_pages: Array<{ title: string, component: any, icon: string }>;

  user: any;



  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events, public popoverCtrl: PopoverController, public network: NetworkProvider, private authService: AuthProvider, private appMinimize: AppMinimize, private firebase: Firebase, private menuCtrl: MenuController, public toastCtrl: ToastController) {
    this.initializeApp();

    this.events.subscribe('popover:launch', () => {
      this.PresentPopover(event);
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Account', component: AccountPage, icon: 'person' },
      { title: 'Transactions', component: HomePage, icon: 'cash' },
      { title: 'Coupons', component: CouponPage, icon: 'pricetags' },
      { title: 'Referrals', component: ReferralsPage, icon: 'people' },
      { title: 'Complaints', component: ComplainPage, icon: 'chatboxes' }
    ];

    this.more_pages = [
   /*    { title: 'All Categories', component: HomePage, icon: 'list' }, */
      { title: 'Vendors', component: VendorListPage, icon: 'basket' }

    ];

  }

  initializeApp() {


    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      try{
        this.initializeFirebase();
      } catch (error) {
        this.firebase.logError(error);
      }

      this.statusBar.overlaysWebView(false);
      //this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#345279');
      this.statusBar.show();

      this.user = this.authService.logged_user();

      this.platform.registerBackButtonAction(() => {
        if (this.menuCtrl.isOpen()) {
          this.menuCtrl.close();
        }
        else if (this.nav.canGoBack()) {
          this.nav.pop();
        } else {
          this.appMinimize.minimize();
        }
      });

      /*
            if (!this.authService.isLoginSubject.value) {
              this.nav.setRoot(LoginPage);
            }
      */

      if (!this.authService.hasToken()) {
        this.nav.setRoot(LoginPage);
      }


/*        this.firebase.getToken()
      .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));

      this.firebase.onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));

      this.firebase.onNotificationOpen().subscribe((res) => {
        if (res.tap) {
            // since firebase sends always string as data you have to parse it
          let data = JSON.parse(res.data)
          if(data.type === 'page1') {
            this.nav.push(HomePage);
            }
            // this else if is for foreground mode
            } else if (!res.tap) {
            this.nav.push(HomePage)
            }
    }); */

    });
  }


  initializeFirebase() {
    if(!this.platform.is("core")) {
      this.firebase.subscribe("all");
      this.platform.is('android') ? this.initializeFirebaseAndroid() : this.initializeFirebaseIOS();
    }
  }

  initializeFirebaseAndroid() {
    this.firebase.getToken().then(token => {});
    this.firebase.onTokenRefresh().subscribe(token => {})
    this.subscribeToPushNotifications();
  }
initializeFirebaseIOS() {
    this.firebase.grantPermission()
    .then(() => {
      this.firebase.getToken().then(token => {});
      this.firebase.onTokenRefresh().subscribe(token => {})
      this.subscribeToPushNotifications();
    })
    .catch((error) => {
      this.firebase.logError(error);
    });
  }

  subscribeToPushNotifications() {
    this.firebase.onNotificationOpen().subscribe((response) => {
      if(response.tap){
        //Received while app in background (this should be the callback when a system notification is tapped)
        //This is empty for our app since we just needed the notification to open the app
      }else{
        //received while app in foreground (show a toast)
        let toast = this.toastCtrl.create({
          message: response.body,
          duration: 3000
        });
        toast.present();
      }
    });
  }

  ionViewCanEnter() {
    return this.authService.isLoginSubject.value;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut() {

    this.authService.logout();
    if (!this.authService.isLoginSubject.value) {
      localStorage.removeItem('logged_user');
      this.nav.setRoot(LoginPage);

    }

  }

  PresentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

}
