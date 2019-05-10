import { Component, OnInit, HostListener } from '@angular/core';
import { BucketService } from './services/BucketService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bookstore';

  @HostListener('window:beforeunload', ['$event'])
  handleSaveBucket() {
    this.bucketService.saveBucketAsCookie();
  }

  constructor(private bucketService: BucketService) { }

  ngOnInit() {
    this.bucketService.bucket.subscribe(value => {
    });
  }
}
