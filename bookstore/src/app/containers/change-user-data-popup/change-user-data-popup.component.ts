import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AccountsService } from 'src/app/services/AccountsService';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { Account } from 'src/app/models/entities/Account';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-change-user-data-popup',
  templateUrl: './change-user-data-popup.component.html',
  styleUrls: ['./change-user-data-popup.component.scss']
})
export class ChangeUserDataPopupComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  accountFormData = { firstName: '', lastName: '', email: '', address: '', phoneNumber: '' };
  formLabels = ['First Name', 'Last Name', 'Email', 'Address', 'Phone Number'];
  formKeys = ['firstName', 'lastName', 'email', 'address', 'phoneNumber'];

  sub: Subscription;

  constructor(
    private dialogRef: MatDialogRef<ChangeUserDataPopupComponent>, private accountsService: AccountsService) { }

  ngOnInit() {
    this.accountsService.loggedUserAccountDetails.pipe(take(1))
      .subscribe(loggedUserAccountDetails => {
        if (!loggedUserAccountDetails.data) {
          this.accountsService.getLoggedUserData();
        }
      });
    this.sub = this.accountsService.loggedUserAccountDetails.subscribe(({ data, isLoading }) => {
      this.isLoading = isLoading;
      console.log(isLoading);
      if (data) {
        const { firstName, lastName, email, address, phoneNumber } = data;
        this.accountFormData = {
          firstName, lastName,
          email: email || '',
          address: address || '',
          phoneNumber: phoneNumber || ''
        };
      }
    });
  }

  @debounceEvent(150)
  onChange({ target }: any) {
    const key = target.name;
    this.accountFormData = { ...this.accountFormData, [key]: target.value };
  }

  handleUpdateLoggedUserData(e: any) {
    e.preventDefault();
    this.isLoading = true;
    this.accountsService.updateLoggedUserData(this.accountFormData)
      .subscribe(
        value => {
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy() { }

}
