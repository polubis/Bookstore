import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LogInGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) { }

  canActivate(): boolean {
    const loggedUser: string | undefined = this.cookieService.get('loggedUser');

    if (loggedUser) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
