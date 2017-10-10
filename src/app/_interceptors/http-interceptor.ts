import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (isDevMode() && req.url.includes(':4200/api')){
      req = req.clone({
        url: req.url.replace('4200','3000')
      });
    }
    if (currentUser && currentUser.token && req.url.includes('/api')){
      req = req.clone({
        setHeaders: {
          Authorization: currentUser.token
        }
      });
    }
    return next.handle(req);
  }

}