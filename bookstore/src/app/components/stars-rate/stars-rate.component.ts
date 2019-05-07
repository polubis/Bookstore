import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars-rate',
  templateUrl: './stars-rate.component.html',
  styleUrls: ['./stars-rate.component.scss']
})
export class StarsRateComponent implements OnInit {
  @Input() rate: number;
  stars: number[];

  constructor() { }

  ngOnInit() {
    const floorRate = Math.floor(this.rate);
    this.stars = Array.from({ length: floorRate }, (_, k) => k);
  }

}
