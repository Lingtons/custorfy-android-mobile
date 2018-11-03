import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  constructor(private alertCtrl: AlertController) {}

  presentAlert(message: string) {
    let alertOptions = {
        title: 'Custorfy',
        subTitle: 'custorfy.com',
        buttons: ['Dismiss']
      };

    alertOptions["message"] = message;

    let flashAlert = this.alertCtrl.create(alertOptions);
    flashAlert.present();
  }

  errorAlert(message: string) {
    let alertOptions = {
        title: 'Custorfy',
        subTitle: 'custorfy.com',
        buttons: ['Dismiss']
      };

    alertOptions["message"] = message;

    let flashAlert = this.alertCtrl.create(alertOptions);
    flashAlert.present();
  }
  
  responseAlert(resCode : number){
    
    switch (resCode) {
        case 422:
        this.presentAlert('Invalid Credentials..');    
            break;
        case 401:
        this.presentAlert('Unauthorized Access..');    
            break;            
        case 500:
        this.presentAlert('Remote Server Error..');    
            break;            
        case 503:
        this.presentAlert('Service Unavailable..');    
            break;            
        case 504:
        this.presentAlert('Gateway Timeout..');    
            break;            
        case 403:
        this.presentAlert('Forbidden..');    
            break;                
        default:
        this.presentAlert('Error Encountered');    
            break;
    }  
    

  }
}