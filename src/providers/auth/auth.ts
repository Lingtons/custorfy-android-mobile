/* import { Http, Headers } from '@angular/http'; */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import 'rxjs/add/operator/map';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public token: any;

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  user: any;


  public url: string = 'https://custorfy.com/api/v1/';

  constructor(public http: HttpClient) {

  }

  signin(email: string, password: string) {
    return this.http.post(this.url + 'login',
      { email: email, password: password },
      { headers: new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' }) });
  }

  signup(name : string, email: string, password: string, phone:string) {
    return this.http.post(this.url + 'register',
      {name:name, email: email, password: password, phone: phone },
      { headers: new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' }) });
  }

  getUser() {
    if (this.getToken() != null) {
      this.token = this.getToken();
return new Promise(resolve => {
  this.http.get(this.url + 'profile').subscribe(data => {
    resolve(data);
    let res = data['data'];
    let user_profile = res.user;
    localStorage.removeItem('logged_user');
    localStorage.setItem('logged_user', JSON.stringify(user_profile));

  }, err => {
    console.log()
  }
  )

});
/*       return this.http.get(this.url + 'profile?token=' + this.token).subscribe(
          response => {
            //return response.json().
            //let res = response.json();

            //let user_profile = res.data.user;
            //localStorage.removeItem('logged_user');
            //localStorage.setItem('logged_user', JSON.stringify(user_profile));
            console.log('ran successfully');
          },
          error => {
            console.log('get user failed');
          }
        ); */
    }
  }


  getToken() {
    return localStorage.getItem('token');
  }

/*   getToken(): Observable<string> {
    let rv: Observable<string>;
    if (!this.isTokenValid()) {
      rv = this.http.get(url).map(rsp => rsp.json());
      rv.subscribe(token => {
        this.token = token;
        this.storage.set('token', token)
      });
    } else {
      rv = Observable.of(this.token);
    }
    return rv;
  } */

  public hasToken(): boolean {
    return tokenNotExpired();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable().share();
  }

  logged_user() {
    this.user = JSON.parse(localStorage.getItem('logged_user'));
    return this.user;
  }



}
