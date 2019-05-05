import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/entities/Book';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recentBooks: Book[] = [
  ];

  constructor(private uiService: UserInterfaceService) { }

  ngOnInit() {
  }

}
