import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-kind',
  template: `
  <li (click)="clicking.emit()" [ngClass]="{'selected-kind': selected, 'not-selected-kind': !selected && editable}">
    {{name}}
  </li>
  `,
  styleUrls: ['./kind.component.scss']
})
export class KindComponent {
  @Input() selected?: boolean;
  @Input() name: string;
  @Input() editable?: boolean;

  @Output() clicking = new EventEmitter<void>();
}
