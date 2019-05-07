import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() elementWidth: string;
  @Input() elementMarginRight: string;
  @Input() sliderHeight: string;
  @Input() error: boolean;
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
