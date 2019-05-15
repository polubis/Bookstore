import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/entities/Book';
import { BooksService } from 'src/app/services/BooksService';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { DataEnhancer } from 'src/app/models/others/DataEnhancer';
import { BucketService } from 'src/app/services/BucketService';

@AutoUnsubscribe()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  recSub: Subscription;
  newSub: Subscription;
  recommendedBooks: DataEnhancer<Book[]>;
  newestBooks: DataEnhancer<Book[]>;

  isSearchingBooks = false;

  constructor(
    private booksService: BooksService,
    private bucketService: BucketService
  ) { }

  ngOnInit() {
    this.booksService.getRecommendedBooks();
    this.booksService.getNewestBooks();
    this.recSub = this.booksService.recommendedBooks.subscribe(books => {
      this.recommendedBooks = books;
    });
    this.newSub = this.booksService.newestBooks.subscribe(books => {
      this.newestBooks = books;
    });
  }

  initializeSearching() {
    this.isSearchingBooks = true;
  }

  handleSearchingBooks(searchTitle: string) {
    this.booksService.findBooks(
      { page: 1, pageSize: 15, searchTitle },
      () => {
        this.isSearchingBooks = false;
      },
      () => {
        this.isSearchingBooks = false;
      }
    );
  }


  ngOnDestroy() { }

}
