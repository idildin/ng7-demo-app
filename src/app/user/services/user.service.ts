import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChangePasswordModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(email: string) {
    const terms = true;
    return this.http.post<any>(environment.apiUrl + '/signup', {
      email, terms
    }, {});
  }

  forgotPassword(email: string) {
    return this.http.post<any>(environment.apiUrl + '/password/forgot', {
      email
    }, {});
  }

  changePassword(data: ChangePasswordModel) {
    return this.http.post<any>(environment.apiUrl + '/password/change', {
      ...data
    }, {});
  }

  me() {
    return this.http.get<any>(environment.apiUrl + '/me', {});
  }
}
