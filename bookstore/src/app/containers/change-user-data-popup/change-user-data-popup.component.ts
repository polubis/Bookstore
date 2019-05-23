import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AccountsService } from 'src/app/services/AccountsService';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FormGroup, FormControl } from '@angular/forms';

@AutoUnsubscribe()
@Component({
  selector: 'app-change-user-data-popup',
  templateUrl: './change-user-data-popup.component.html',
  styleUrls: ['./change-user-data-popup.component.scss']
})
export class ChangeUserDataPopupComponent implements OnInit, OnDestroy {
  isLoading: boolean;

  accountsFormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    street: new FormControl(),
    postcode: new FormControl(),
    city: new FormControl(),
    phoneNumber: new FormControl()
  });

  sub: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangeUserDataPopupComponent>, private accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.accountsService.loggedUserAccountDetails.pipe(take(1))
      .subscribe(loggedUserAccountDetails => {
        if (!loggedUserAccountDetails.data) {
          this.accountsService.getLoggedUserData();
        }
      });
    this.sub = this.accountsService.loggedUserAccountDetails.subscribe(({ data, isLoading }) => {
      this.isLoading = isLoading;
      if (data) {
        const { firstName, lastName, email, address, phoneNumber } = data;
        this.accountsFormGroup.setValue({
          firstName, lastName,
          email: email || '',
          street: address ? address.street : '',
          postcode: address ? address.postcode : '',
          city: address ? address.city : '',
          phoneNumber: phoneNumber || ''
        });
      }
    });
  }

  handleUpdateLoggedUserData(e: any) {
    e.preventDefault();
    this.isLoading = true;
    this.accountsService.updateLoggedUserData(this.accountsFormGroup.value as any)
      .subscribe(
        value => {
          this.isLoading = false;
          this.snackBar.open('Pomyślnie zapisano zmiany w ustawieniach', 'ZAMKNIJ', {
            duration: 2000,
            panelClass: ['succ-snackbar']
          });
        },
        err => {
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy() { }

}
