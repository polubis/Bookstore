import { Component, OnInit } from '@angular/core';
import { UserInterfaceService } from '../../services/UserInterfaceService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isLogingIn = false;

  errors: { [key: string]: string } = {};

  constructor(private uiService: UserInterfaceService) { }

  ngOnInit() {
  }

  handleChange(e: any) {
    this[e.target.name] = e.target.value;
  }

  handleLogingIn(e: any) {
    e.preventDefault();
    this.isLogingIn = true;
  }
}
