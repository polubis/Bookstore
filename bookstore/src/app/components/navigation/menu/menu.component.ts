import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoggedUser } from 'src/app/models/entities/LoggedUser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() loggedUser: LoggedUser;
  @Output() closing = new EventEmitter<void>();
  @Output() clickingOrders = new EventEmitter<void>();
  @Output() clickingSettings = new EventEmitter<void>();
  @Output() clickingLogout = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {
  }
}
