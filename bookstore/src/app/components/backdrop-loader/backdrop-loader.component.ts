import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-backdrop-loader',
  templateUrl: './backdrop-loader.component.html',
  styleUrls: ['./backdrop-loader.component.scss']
})
export class BackdropLoaderComponent implements OnInit {
  @Input() loaderSize = 'medium';

  ngOnInit() {
  }

}
