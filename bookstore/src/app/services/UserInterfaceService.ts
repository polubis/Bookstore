import { Injectable } from '@angular/core';
import { RegisterComponent } from '../containers/register/register.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderPopupComponent } from '../containers/order-popup/order-popup.component';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {

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
}
