import { Injectable } from '@angular/core';
import { Adapter } from '../../core';
import { Profile, ProfileAdapter } from './profile.model';

export class User {
  constructor(
    public id: number,
    public email: string,
    public profile: Profile,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {

  constructor(
    private profileAdapter: ProfileAdapter
  ) { }

  adapt(item: any): User {
    return new User(
      item.id,
      item.email,
      this.profileAdapter.adapt(item.profile),
    );
  }
}
