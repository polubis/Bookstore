import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AuthService } from 'src/app/services/AuthService';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';

const hightLightConfig = {
  '/admin': 0,
  '/admin/books': 1,
  '/admin/orders': 2
};

@AutoUnsubscribe()
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  focusedNavEl = 0;
  sub: Subscription;

  constructor(private router: Router, private authService: AuthService, private uiService: UserInterfaceService) {
    this.sub = this.router.events.pipe(debounceTime(50)).subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.focusedNavEl = hightLightConfig[urlAfterRedirects];
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {}

}
