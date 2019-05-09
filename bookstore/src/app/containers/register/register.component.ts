import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/entities/User';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [TitleCasePipe]
})
export class RegisterComponent implements OnInit {
  isCreatingAccount = false;

  newUser: User = { firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '' };
  formFirstKeys = ['First Name', 'Last Name', 'Username', 'Email'];
  formSecondKeys = ['Password', 'Confirm Password'];

  constructor(private dialogRef: MatDialogRef<RegisterComponent>, private titlecase: TitleCasePipe, private authService: AuthService) { }

  ngOnInit() {
  }

  @debounceEvent(150)
  onChange({ target }: any) {
    const key = this.titlecase.transform(target.name);
    this.newUser = { ...this.newUser, [key]: target.value };
  }

  handleCreatingAccount(e: any) {
    e.preventDefault();
    this.isCreatingAccount = true;
    this.authService.createAccount(this.newUser)
      .subscribe(
        (newUser: any) => {
          console.log(newUser);
          this.isCreatingAccount = false;
        },
        () => {
          this.isCreatingAccount = false;
        }
      );
  }

  closeRegisterForm() {
    if (!this.isCreatingAccount) {
      this.dialogRef.close();
    }
  }
}
