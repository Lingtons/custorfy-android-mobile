import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  template: `
  <ion-list no-lines>
<a ion-item href="tel:+2349060009272" >Call Support <ion-icon item-start name = "call"></ion-icon></a>
<button ion-item (click)="openWebsite('https://custorfy.com')" >Website<ion-icon item-start name = "globe"></ion-icon></button>
<button ion-item (click)="openPrivacy('https://www.freeprivacypolicy.com/privacy/view/16ce74514ba03734ae49848401601d97')" >Privacy<ion-icon item-start name = "globe"></ion-icon></button>


</ion-list>
`
})
export class PopoverPage {

  constructor(public app: App, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public ev: Events, private inAppBrowser: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  openWebsite(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes',
      mediaPlaybackRequiresUserAction: 'no'
    }
// Opening a URL and returning an InAppBrowserObject
const browser = this.inAppBrowser.create(url, '_self', options);
}

openPrivacy(url: string) {
  const options: InAppBrowserOptions = {
    zoom: 'no',
    location: 'yes',
    mediaPlaybackRequiresUserAction: 'no'
  }
// Opening a URL and returning an InAppBrowserObject
const browser = this.inAppBrowser.create(url, '_self', options);
}

PresentPopover(event: Event){
  this.ev.publish('popover:launch');
  }


}
