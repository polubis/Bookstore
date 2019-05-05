import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/entities/Book';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { BooksService } from 'src/app/services/BooksService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private uiService: UserInterfaceService, private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getRecommendedBooks({ });
  }

}
