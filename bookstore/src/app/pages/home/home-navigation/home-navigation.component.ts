import { Component, OnInit, HostListener } from '@angular/core';
import { debounceEvent } from '../../../helpers/debounce-decorator';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.scss']
})
export class HomeNavigationComponent implements OnInit {

  navigationClass: string = this.calcClass();

  constructor(private uiService: UserInterfaceService) { }

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
