import { Component, OnInit, HostListener } from '@angular/core';
import { throttleEvent } from '../../helpers/throttle-decorator';

@Component({
  selector: 'app-bucket-panel',
  templateUrl: './bucket-panel.component.html',
  styleUrls: ['./bucket-panel.component.scss']
})
export class BucketPanelComponent implements OnInit {
  scrolledContent: number = this.calculateScrolledContent();

  constructor() { }

  ngOnInit() {
  }

  calculateScrolledContent() {
    // console.log(window.scrollY, window.innerHeight);
    const percentage = Math.floor(((window.scrollY + window.innerHeight) / document.body.offsetHeight) * 100);
    const scrolledContent = percentage >= 100 ? 100 : percentage;
    return scrolledContent;
  }

  @HostListener('window:scroll', [])
  @throttleEvent()
  handleTogglingBucketIcon() {
    this.scrolledContent = this.calculateScrolledContent();
  }

}
