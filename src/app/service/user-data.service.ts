import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  private usersDataSubject = new BehaviorSubject<User[]>([]);
  usersData$ = this.usersDataSubject.asObservable();

  setUsersData(users: User[]): void {
    this.usersDataSubject.next(users);
  }
}
