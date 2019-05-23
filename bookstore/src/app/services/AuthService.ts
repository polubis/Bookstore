import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggedUser } from '../models/entities/LoggedUser';
import { ApiService } from './ApiService';
import { User } from '../models/entities/User';
import { ServerError } from '../models/others/ServerError';
import { RequestResponse } from '../models/others/RequestResponse';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService, private router: Router, private cookieService: CookieService) {
  }

  initiaLoggedUser: LoggedUser = {
    isLoggedIn: false,
    role: [],
    firstName: '',
    lastName: '',
    username: ''
  };

  loggedUser = new BehaviorSubject<LoggedUser>(this.readLoggedUserFromCookie());

  isLogingIn = new BehaviorSubject(false);

  private readLoggedUserFromCookie(): LoggedUser {
    const loggedUserAsString: string | undefined = this.cookieService.get('loggedUser');
    return loggedUserAsString ? JSON.parse(loggedUserAsString) : this.initiaLoggedUser;
  }

  logIn(username: string, password: string) {
    this.apiService.execute('accounts/login', 'post', { username, password })
      .subscribe(
        ({ successResult: userData }: RequestResponse<LoggedUser>) => {
          const loggedUserData: LoggedUser = { ...userData, isLoggedIn: true };
          const isAdmin = userData.role.includes('Administrator');
          this.cookieService.set('loggedUser', JSON.stringify(loggedUserData));

          if (isAdmin) {
            this.router.navigate(['/', 'admin']);

          } else {
            this.router.navigate(['/', 'store']);
          }

          this.isLogingIn.next(false);
          this.loggedUser.next(loggedUserData);
        },
        ({ message, code }: ServerError) => {
          this.isLogingIn.next(false);
          this.loggedUser.next(this.initiaLoggedUser);
        }
      );
  }

  logout() {
    this.cookieService.delete('loggedUser');
    this.loggedUser.next(this.initiaLoggedUser);
    this.router.navigate(['/']);
    this.apiService.execute('accounts/logout', 'post').subscribe();
  }

  createAccount = (user: User) => this.apiService.execute('accounts/register', 'post', user);

}
