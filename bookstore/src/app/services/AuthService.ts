import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggedUser } from '../models/entities/LoggedUser';
import { ApiService } from './ApiService';

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

}
