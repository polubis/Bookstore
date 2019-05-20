import { Directive, HostListener, Input, ElementRef, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective implements OnInit {
  @Input() imageClass = '';
  @Input() baseClass: string;
  @HostBinding('class')
  elementClass = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.elementClass = this.baseClass;
  }

  @HostListener('error', ['$event'])
  handleBrokenImage() {
    this.el.nativeElement.src = '../../assets/broken-image.svg';
    if (this.imageClass) {
      this.elementClass = 'broken-image';
    }
  }
}
