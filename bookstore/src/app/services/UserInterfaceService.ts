import { Injectable } from '@angular/core';
import { RegisterComponent } from '../containers/register/register.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderPopupComponent } from '../containers/order-popup/order-popup.component';
import { UserOrdersPopupComponent } from '../containers/user-orders-popup/user-orders-popup.component';
import { ChangeUserDataPopupComponent } from '../containers/change-user-data-popup/change-user-data-popup.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {

  isLoadingOnAdmin = new Subject<boolean>();

  constructor(private dialog: MatDialog) {}

  openRegisterForm() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(RegisterComponent, dialogConfig);
  }

  openOrderPopup() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(OrderPopupComponent, dialogConfig);
  }

  openUserOrdersPopup(username: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { username };

    this.dialog.open(UserOrdersPopupComponent, dialogConfig);
  }

  openChangeUserDataPopup() {
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(ChangeUserDataPopupComponent, dialogConfig);
  }
}
