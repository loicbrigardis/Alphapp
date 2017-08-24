import { ErrorsService } from './../errors/errors.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { User } from './../auth/user.model';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private API_URL = "http://localhost:4400/api/signup"
  private API_URL_AUTH = "http://localhost:4400/api/login"
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private errorsService: ErrorsService) { }

  signUp(user: User): Observable<any> {
    return this.http.post(this.API_URL, JSON.stringify(user), this.options)
      .map((result) => result.json())
      .catch((err) => {
        this.errorsService.handleError(err.json());
        return Observable.throw(err.json());
      });
  }

  logIn(user: User): Observable<any> {
    return this.http.post(this.API_URL_AUTH, JSON.stringify(user), this.options)
      .map((result) => result.json())
      .catch((err) => {
        this.errorsService.handleError(err.json());
        return Observable.throw(err.json());
      });
  }

  userIsLogin(): boolean {
    return window.localStorage.getItem('token') !== null;
  }

  logout(): void {
    localStorage.clear();
  }
}
