import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { BucketService } from 'src/app/services/BucketService';
import { Subscription } from 'rxjs';
import { Bucket } from 'src/app/models/entities/Bucket';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AuthService } from 'src/app/services/AuthService';
import { LoggedUser } from 'src/app/models/entities/LoggedUser';

@AutoUnsubscribe()
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Input() navigationClass = 'normal-nav';
  isMenuOpen = true;

  authSub: Subscription;
  loggedUser: LoggedUser;

  bucketSub: Subscription;
  cost: number;
  size: number;

  constructor(private uiService: UserInterfaceService, private bucketService: BucketService, private authService: AuthService) { }

  ngOnInit() {
    this.bucketSub = this.bucketService.bucket.subscribe(({ cost, size }: Bucket) => {
      this.cost = cost;
      this.size = size;
    });
    this.authSub = this.authService.loggedUser.subscribe((loggedUser: LoggedUser) => {
      this.loggedUser = loggedUser;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy() {}
}
