import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';
import { AuthService } from './AuthService';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {
  }

  updateLoggedUserData(formData: { firstName: string, lastName: string, email: string, address: string, phoneNumber: string }) {
    return this.apiService.execute('accounts/updateUserData', 'post', formData);
  }

  getLoggedUserData() {
    return this.authService.loggedUser.pipe(
      take(1),
      switchMap(loggedUser => {
        return this.apiService.execute('accounts/getUserData', 'get', {}, `/${loggedUser.username}`);
      })
    );
  }
}
