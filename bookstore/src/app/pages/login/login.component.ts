import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInterfaceService } from '../../services/UserInterfaceService';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/AuthService';

const imagesLimit = 5;
const animationDuration = 10000;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';

  currentImageIndex = 1;
  animationInterval = interval(animationDuration).subscribe(() => {
    this.currentImageIndex = this.currentImageIndex + 1 === imagesLimit ? 1 : ++this.currentImageIndex;
  });

  errors: { [key: string]: string } = {};

  constructor(private uiService: UserInterfaceService, private authService: AuthService) { }

  ngOnInit() {
  }

  handleChange(e: any) {
    this[e.target.name] = e.target.value;
  }

  handleLogIn(e: any) {
    e.preventDefault();
    this.authService.isLogingIn.next(true);
    this.authService.logIn(this.username, this.password);
  }

  ngOnDestroy() {
    this.animationInterval.unsubscribe();
  }
}
