import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AuthService } from 'src/app/services/AuthService';

const hightLightConfig = {
  '/admin': 0,
  '/admin/books': 1,
  '/admin/books-kinds': 2,
  '/admin/authors': 3,
  '/admin/orders': 4
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

  constructor(private router: Router, private authService: AuthService) {
    this.sub = this.router.events.pipe(debounceTime(50)).subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.focusedNavEl = hightLightConfig[urlAfterRedirects];
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {}

}
