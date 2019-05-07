import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/entities/Book';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { BooksService } from 'src/app/services/BooksService';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { DataEnhancer } from 'src/app/models/others/DataEnhancer';

@AutoUnsubscribe()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sub: Subscription;
  recommendedBooks: DataEnhancer<Book[]>;

  constructor(private uiService: UserInterfaceService, private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getRecommendedBooks();
    this.sub = this.booksService.recommendedBooks.subscribe(books => {
      this.recommendedBooks = books;
    });
  }

  ngOnDestroy() {}

}
