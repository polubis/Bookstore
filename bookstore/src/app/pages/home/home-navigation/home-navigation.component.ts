import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { debounceEvent } from '../../../helpers/debounce-decorator';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { BucketService } from 'src/app/services/BucketService';
import { Subscription } from 'rxjs';
import { Bucket } from 'src/app/models/entities/Bucket';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AuthService } from 'src/app/services/AuthService';
import { LoggedUser } from 'src/app/models/entities/LoggedUser';

@AutoUnsubscribe()
@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.scss']
})
export class HomeNavigationComponent implements OnInit, OnDestroy {
  navigationClass: string = this.calcClass();

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

  calcClass(): string {
    return window.scrollY > 584 ? 'filled-nav' : '';
  }

  @HostListener('window:scroll', [])
  @debounceEvent()
  handleTogglingBucketIcon() {
    this.navigationClass = this.calcClass();
  }

  ngOnDestroy() {}
}
