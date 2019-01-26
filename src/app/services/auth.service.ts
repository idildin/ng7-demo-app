import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtInfo } from '../shared';
import { Observable, ReplaySubject } from 'rxjs';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = environment.apiUrl + '/login';
  refreshTokenUrl = environment.apiUrl + '/token/refresh';
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  login(email: string, password: string): Observable<any> {
    const observable = this.http.post<{token: string}>(this.loginUrl, {
      email, password
    });
    const subject = new ReplaySubject(1);
    subject.subscribe(
      (result: { token: string, refresh_token: string }) => {
      this.setToken(result.token);
      this.setRefreshToken(result.refresh_token);
    }, (error) => {
      this.handleAuthenticationError(error);
    });

    observable.subscribe(subject);
    return subject;
  }

  logout() {
    this.setToken(null);
  }

  private handleAuthenticationError(error: any) {
    this.setToken(null);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    const refreshObservable = this.http.post(this.refreshTokenUrl, {
      'refresh_token': refreshToken
    });

    const refreshSubject = new ReplaySubject(1);
    refreshSubject.subscribe((r: {token: string, refresh_token: string}) => {
      this.setToken(r.token);
      this.setRefreshToken(r.refresh_token);
    }, (err) => {
      this.handleAuthenticationError(err);
    });

    refreshObservable.subscribe(refreshSubject);
    return refreshSubject;
  }

  public get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string) {
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
    } else {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  private setRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } else {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public get getTokenInfo(): JwtInfo {
    return this.jwtHelper.decodeToken(this.getToken());
  }

  get getRoles() {
    return this.getTokenInfo.roles;
  }
}
