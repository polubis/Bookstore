import { Component, OnInit, HostListener } from '@angular/core';
import { debounceEvent } from '../../../helpers/debounce-decorator';

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.scss']
})
export class HomeNavigationComponent implements OnInit {

  navigationClass: string = this.calcClass();

  constructor() { }

  ngOnInit() {
  }

  calcClass(): string {
    return window.scrollY > 584 ? 'filled-nav' : '';
  }

  @HostListener('window:scroll', [])
  @debounceEvent()
  handleTogglingBucketIcon() {
    this.navigationClass = this.calcClass();
  }
}
