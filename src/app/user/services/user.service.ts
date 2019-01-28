import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChangePassword, Profile, User, UserAdapter } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private adapter: UserAdapter
    ) { }

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

  changePassword(data: ChangePassword) {
    return this.http.post<any>(environment.apiUrl + '/password/change', {
      ...data
    }, {});
  }

  changeProfile(data: Profile) {
    return this.http.post<any>(environment.apiUrl + '/user/profile', {
      ...data
    }, {});
  }

  me(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/me').pipe(
      map((data: any) => this.adapter.adapt(data)
    ));
  }
}
