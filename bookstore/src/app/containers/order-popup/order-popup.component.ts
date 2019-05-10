import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OrderPopupComponent>, private authService: AuthService) { }

  ngOnInit() {
  }

  closePopup() {
    this.dialogRef.close();
  }
}
