import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  throwError,
} from 'rxjs';
import { catchError, finalize, mergeMap } from 'rxjs/operators';

import { AuthService } from '../services';
import { JwtInterceptor, JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtInterceptor: JwtInterceptor,
    private jwtHelper: JwtHelperService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (this.authService.isAuthenticated && this.jwtHelper.isTokenExpired(token)) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          switch ((<HttpErrorResponse>error).status) {
            case 401:
              return this.handle401Error(req, next);
            default:
              return throwError(error);
          }
          this.logout();
          return throwError(error);
        })
      );
    }

    return next.handle(req);
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      return this.authService.refreshToken()
        .pipe(
          mergeMap(() => {
            return this.jwtInterceptor.intercept(req, next);
          }),
          catchError(err => {
            this.logout();
            return throwError(err);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    }
    this.isRefreshingToken = false;

    return next.handle(req);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
