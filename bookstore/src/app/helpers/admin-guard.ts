import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoggedUser } from '../models/entities/LoggedUser';

@Injectable({
  providedIn: 'root'
})
export class AdmingGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) { }

  canActivate(): boolean {
    const loggedUser: string | undefined = this.cookieService.get('loggedUser');

    if (!loggedUser) {
      this.router.navigateByUrl('/login');
      return false;
    }

    const parsedLoggedUser: LoggedUser = JSON.parse(loggedUser);
    const isAdmin = parsedLoggedUser.role.includes('Administrator');

    if (isAdmin) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
