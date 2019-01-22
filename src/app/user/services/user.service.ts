import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(email: string) {
    const terms = true;
    return this.http.post<any>(environment.apiUrl + '/signup', {
      email, terms
    }, {}).pipe(map(user => {
    }));
  }

  forgotPassword(email: string) {
    return this.http.post<any>(environment.apiUrl + '/password/forgot', {
      email
    }, {}).pipe(map(user => {
    }));
  }

  me() {
    return this.http.get<any>(environment.apiUrl + '/me', {});
  }
}
