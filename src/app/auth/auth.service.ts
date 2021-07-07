import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.module';
import { URL } from './../shared/constants'
export interface AuthResponsedata {
  status: string,
  token: string,
  tokenExpiresIn: number,
  data: {
    userId: string,        // userId statnds for Sequelize userID
    user: object
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user: User | undefined;
  private tokenExpirationTimer: any;
  public isOtpSent: boolean = false;
  public emailForResetPassword: string = '';
  public BaseURL = 'http://127.0.0.1:3000/api/v1/auth';

  constructor(private readonly http: HttpClient, private readonly router: Router) {

  }

  public signUp (name: string, email: string, password: string, passwordConfirm: string): Observable<AuthResponsedata> {
    return this.http.post<any>(
      URL.signup,
      {
        name,
        email,
        password,
        passwordConfirm
      }
    ).pipe(catchError(this.handleError));
  }

  public login (email: string, password: string) {
    
    return this.http.post<AuthResponsedata>(
      URL.signin,
      {
        email,
        password
      }).pipe(catchError(this.handleError), tap(resData => {

        this.handleAuthentication(resData.token, resData.tokenExpiresIn, resData.data.userId, resData.data.user);

      }));
  }

  private handleAuthentication (token: string, expiresInMs: number, userId: string, userObj: any) {
    const expirationDate = new Date(new Date().getTime() + expiresInMs);
    const user = new User(userObj.email, userObj.name, userId, userObj._id, token, expirationDate);
    this.user = user;
    localStorage.setItem('userData', JSON.stringify(user));
  }
  public autoLogin () {
    const localStorageData = localStorage.getItem('userData');
    const userData = localStorageData ? JSON.parse(localStorageData || '') : undefined;
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.name,
      userData.userId,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user = loadedUser;
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }
  public logout () {
    this.user = undefined;
    this.router.navigate(['/auth/signin']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }
  public autoLogout (expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  public updateToken (resData: any) {
    this.handleAuthentication(resData.token, resData.tokenExpiresIn, resData.data.userId, resData.data.user);
  }

  public sendOTP (email: string) {
    return this.http.post<AuthResponsedata>(
      URL.forgotPassword,
      {
        email: email
      }).pipe(catchError(this.handleError));
  }

  public resetPassword (passwordObj: object) {
    const forgotPasswordURL = this.BaseURL + '/resetPassword';
    return this.http.patch<any>(
      URL.resetPassword,
      passwordObj
    ).pipe(catchError(this.handleError));
  }
  private handleError (errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred';
    // if ( !errorRes.error || !errorRes.error.error ) {
    //   return throwError( errorMsg );
    // }
    // console.log(errorRes);
    return throwError(errorRes);

  }
}