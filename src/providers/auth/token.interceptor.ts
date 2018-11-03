import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthProvider } from './auth';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../services/toast-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthProvider, public toastCtrl: ToastService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if(err.message === "token_expired"){
          this.toastCtrl.presentToast('Session Expired');
        }
        else if (err.status === 401) {
          this.toastCtrl.presentToast('Error Processing Request');
          // redirect to the login route
          // or show a modal
        } else if (err != null) {
          this.toastCtrl.presentToast('Error Processing Request');
        }
      }
    });
  }
}
