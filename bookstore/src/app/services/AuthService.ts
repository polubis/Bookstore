import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggedUser } from '../models/entities/LoggedUser';
import { ApiService } from './ApiService';
import { User } from '../models/entities/User';
import { ServerError } from '../models/others/ServerError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUserMetaData = new BehaviorSubject<LoggedUser>({
    isLoggedIn: false,
    role: '',
    email: '',
    firstName: '',
    lastName: '',
    id: -1,
    username: ''
  });

  isLogingIn = new BehaviorSubject(false);

  constructor(private apiService: ApiService) {

  }

  logIn(username: string, password: string) {
    this.apiService.execute('accounts/login', 'post', { username, password })
      .subscribe(
        value => {
          this.isLogingIn.next(false);
          this.loggedUserMetaData.next(value);
        },
        error => {
          this.isLogingIn.next(false);
        }
      );
  }

  createAccount = (user: User) => this.apiService.execute('accounts/register', 'post', user);

}
