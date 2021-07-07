import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthURLs } from './../shared/constants'
import { Injector } from '@angular/core';
@Injectable()
export class AuthIntercetorService implements HttpInterceptor {
  constructor(private injector: Injector) { }
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (AuthURLs.includes(req.url)) {
      return next.handle(req);
    }
    const authService = this.injector.get(AuthService);
    const token = 'Bearer ' + authService.user?.token;
    const modifiedReq = req.clone({ setHeaders: { 'authorization': token } });
    //const modifiedReq = req.clone({ headers: new HttpHeaders({ 'authorization': token }) });
    //req.headers.append('authorization', token)
    return next.handle(modifiedReq);

  }

}