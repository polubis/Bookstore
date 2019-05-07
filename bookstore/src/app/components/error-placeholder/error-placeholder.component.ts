import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-placeholder',
  templateUrl: './error-placeholder.component.html',
  styleUrls: ['./error-placeholder.component.scss']
})
export class ErrorPlaceholderComponent implements OnInit {
  @Input() error: { message: string, code: number };

  constructor() { }

  ngOnInit() {
  }

}
