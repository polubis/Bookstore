import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-books-slider',
  templateUrl: './books-slider.component.html',
  styleUrls: ['./books-slider.component.scss']
})
export class BooksSliderComponent implements OnInit {
  @Input() title: string;


  constructor() { }

  ngOnInit() {
  }

}
