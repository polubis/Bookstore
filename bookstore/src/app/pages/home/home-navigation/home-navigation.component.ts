import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { debounceEvent } from '../../../helpers/debounce-decorator';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { BucketService } from 'src/app/services/BucketService';
import { Subscription } from 'rxjs';
import { Bucket } from 'src/app/models/entities/Bucket';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.scss']
})
export class HomeNavigationComponent implements OnInit, OnDestroy {
  navigationClass: string = this.calcClass();
  sub: Subscription;
  cost: number;
  size: number;

  constructor(private uiService: UserInterfaceService, private bucketService: BucketService) { }

  ngOnInit() {
    this.sub = this.bucketService.bucket.subscribe(({ cost, size }: Bucket) => {
      this.cost = cost;
      this.size = size;
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
