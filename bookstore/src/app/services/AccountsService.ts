import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';
import { AuthService } from './AuthService';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { Account } from '../models/entities/Account';
import { RequestResponse } from '../models/others/RequestResponse';
import { ServerError } from '../models/others/ServerError';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {
  }

  loggedUserAccountDetails = new BehaviorSubject<DataEnhancer<Account>>({ isLoading: false, error: null, data: null });

  updateLoggedUserData(formData: { firstName: string, lastName: string, email: string, address: string, phoneNumber: string }) {
    return this.apiService.execute('accounts/updateUserData', 'post', formData);
  }

  getLoggedUserData() {
    this.loggedUserAccountDetails.next({ isLoading: true, error: null, data: null });
    this.authService.loggedUser.pipe(
      take(1)
    ).subscribe(loggedUser => {
      this.apiService.execute('accounts/getUserData', 'get', {}, `/${loggedUser.username}`)
        .subscribe(
          ({ successResult: data }: RequestResponse<Account>) => {
            this.loggedUserAccountDetails.next({ isLoading: false, error: null, data });
          },
          (error: ServerError) => {
            this.loggedUserAccountDetails.next({ isLoading: false, error, data: null });
          }
        );
    });
  }
}
