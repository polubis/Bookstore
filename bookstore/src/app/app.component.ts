import { Component, OnInit, HostListener } from '@angular/core';
import { BucketService } from './services/BucketService';
import { StatusesService } from './services/StatusesService';

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

  constructor(
    private bucketService: BucketService,
    private statusesService: StatusesService
  ) { }

  ngOnInit() {
    this.statusesService.getStatuses();
  }
}
