import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isCreatingAccount = false;

  constructor(private dialogRef: MatDialogRef<RegisterComponent>) {}

  ngOnInit() {
  }


  handleCreatingAccount(e: any) {
    e.preventDefault();
    this.isCreatingAccount = true;
  }

  closeRegisterForm() {
    this.dialogRef.close();
  }
}
