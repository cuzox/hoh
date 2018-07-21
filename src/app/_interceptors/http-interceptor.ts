import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
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