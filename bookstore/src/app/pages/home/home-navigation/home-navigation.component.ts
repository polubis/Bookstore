import { Component, HostListener } from '@angular/core';
import { debounceEvent } from '../../../helpers/debounce-decorator';

@Component({
  selector: 'app-home-navigation',
  template: `
    <app-navigation [navigationClass]="navigationClass"></app-navigation>
  `
})
export class HomeNavigationComponent {
  navigationClass: string = this.calcClass();

  calcClass(): string {
    return window.scrollY > 584 ? 'filled-nav' : '';
  }

  @HostListener('window:scroll', [])
  @debounceEvent()
  handleTogglingBucketIcon() {
    this.navigationClass = this.calcClass();
  }
}
