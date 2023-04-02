import { Injectable } from '@angular/core';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorExtendedService extends AuthHttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/public')) {
      return next.handle(req);
    } else if (req.url.startsWith('https://www.espncricinfo.com')) {
      return next.handle(req);
    }
    else {
      return super.intercept(req, next);
    }
  }
}
