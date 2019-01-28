import { Injectable } from '@angular/core';
import { Adapter } from '../../core';

export class Profile {
  constructor(
    public firstName: string,
    public lastName: string,
    public dob: Date,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class ProfileAdapter implements Adapter<Profile> {

  adapt(item: any): Profile {
    return new Profile(
      item.firstName,
      item.lastName,
      new Date(item.dob)
    );
  }
}
