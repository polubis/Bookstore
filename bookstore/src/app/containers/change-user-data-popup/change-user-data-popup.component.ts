import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AccountsService } from 'src/app/services/AccountsService';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { Account } from 'src/app/models/entities/Account';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';

@Component({
  selector: 'app-change-user-data-popup',
  templateUrl: './change-user-data-popup.component.html',
  styleUrls: ['./change-user-data-popup.component.scss']
})
export class ChangeUserDataPopupComponent implements OnInit {
  isLoading = true;
  accountFormData = { firstName: '', lastName: '', email: '', address: '', phoneNumber: '' };
  formLabels = ['First Name', 'Last Name', 'Email', 'Address', 'Phone Number'];
  formKeys = ['firstName', 'lastName', 'email', 'address', 'phoneNumber'];

  constructor(
    private dialogRef: MatDialogRef<ChangeUserDataPopupComponent>, private accountsService: AccountsService) { }

  ngOnInit() {
    this.accountsService.getLoggedUserData()
      .subscribe(
        ({ successResult: accountData }: RequestResponse<Account>) => {
          this.isLoading = false;

          const { firstName, lastName, email, address, phoneNumber } = accountData;
          this.accountFormData = {
            firstName, lastName,
            email: email || '',
            address: address || '',
            phoneNumber: phoneNumber || ''
          };
        },
        err => {
          this.isLoading = false;
        }
      );
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

}
