import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../providers/auth/token.interceptor';
import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Firebase } from '@ionic-native/firebase';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AccountPage } from '../pages/account/account';
import { TransactionDetailPage } from '../pages/transaction-detail/transaction-detail';
import { VendorListPage } from '../pages/vendor-list/vendor-list';
import { VendorDetailPage } from '../pages/vendor-detail/vendor-detail';
import { ToastService } from '../services/toast-service';
import { SelectService } from '../services/select-service';
import { AlertService } from '../services/alert-service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { VendorProvider } from '../providers/auth/vendor';
import { NetworkProvider } from '../providers/network/network';
import { TransactionProvider } from '../providers/auth/transaction';
import { ReferralProvider } from '../providers/auth/referral';
import { CouponProvider } from '../providers/auth/coupons';
import { ComplainProvider } from '../providers/auth/complains';
import { ReferralsPage } from '../pages/referrals/referrals';
import { CouponPage } from '../pages/coupon/coupon';
import { NewCouponPage } from '../pages/coupon/newcoupon';
import { ComplainPage } from '../pages/complain/complain';
import { NewComplainPage } from '../pages/complain/newcomplain';
import { ViewcouponPage } from '../pages/viewcoupon/viewcoupon';
import { ThreadPage } from '../pages/thread/thread';
import { PopoverPage } from '../pages/popover/popover';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AccountPage,
    TransactionDetailPage,
    VendorListPage,
    VendorDetailPage,
    ReferralsPage,
    CouponPage,
    NewCouponPage,
    ComplainPage,
    NewComplainPage,
    ViewcouponPage,
    ThreadPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AccountPage,
    TransactionDetailPage,
    VendorListPage,
    VendorDetailPage,
    ReferralsPage,
    CouponPage,
    NewCouponPage,
    ComplainPage,
    NewComplainPage,
    ViewcouponPage,
    ThreadPage,
    PopoverPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StatusBar,
    SplashScreen,
    ToastService,
    SelectService,
    AlertService,
    Network,
    AppMinimize,
    InAppBrowser,
    SocialSharing,
    Firebase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true },
    AuthProvider,
    NetworkProvider,
    TransactionProvider,
    ReferralProvider,
    VendorProvider,
    CouponProvider,
    ComplainProvider

  ]
})
export class AppModule { }
