import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() elementWidth: number;
  @Input() elementMarginRight: number;
  @Input() sliderHeight: string;
  @Input() error: boolean;
  @Input() loading: boolean;
  @Input() elementsCount: number;
  @ViewChild('slider') sliderRef: ElementRef;

  jump: number;
  maxScrollPosition: number;
  sliderContainerWidth: number;
  scrollPosition = 0;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges({ elementsCount }: SimpleChanges) {
    const shouldCalculateConfig = !this.maxScrollPosition && elementsCount.currentValue > 0;
    if (shouldCalculateConfig) {
      const jump = this.elementWidth + this.elementMarginRight;
      this.jump = jump;
      this.maxScrollPosition = this.jump * elementsCount.currentValue;
    }
  }

  ngAfterViewInit() {
    if (!this.sliderContainerWidth) {
      this.sliderContainerWidth = this.sliderRef.nativeElement.clientWidth;
      console.log('wrocic tutaj kiedys');
    }
  }

  @debounceEvent(150)
  moveLeft() {
    const newScrollPosition = this.scrollPosition - this.jump;
    this.sliderRef.nativeElement.scrollLeft = newScrollPosition;
    this.scrollPosition = newScrollPosition;
  }

  @debounceEvent(150)
  moveRight() {
    const newScrollPosition = this.scrollPosition + this.jump;
    this.sliderRef.nativeElement.scrollLeft = newScrollPosition;
    this.scrollPosition = newScrollPosition;
  }
}
