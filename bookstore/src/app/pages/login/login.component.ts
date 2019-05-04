import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInterfaceService } from '../../services/UserInterfaceService';
import { interval } from 'rxjs';

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
  isLogingIn = false;

  currentImageIndex = 1;
  animationInterval = interval(animationDuration).subscribe(() => {
    this.currentImageIndex = this.currentImageIndex + 1 === imagesLimit ? 1 : ++this.currentImageIndex;
  });

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

  ngOnDestroy() {
    this.animationInterval.unsubscribe();
  }
}
