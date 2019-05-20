import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from 'src/app/services/BooksService';
import { Subscription, of } from 'rxjs';
import { ServerError } from 'src/app/models/others/ServerError';
import { Book, BooksFilterConfig } from 'src/app/models/entities/Book';
import { LibraryService } from './LibraryService';
import { switchMap, debounceTime, filter } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {

  filtersSub: Subscription;
  booksSub: Subscription;
  isLoading: boolean;
  error: ServerError;
  books: Book[];
  filters: BooksFilterConfig;

  constructor(private booksService: BooksService, private libraryService: LibraryService) { }

  ngOnInit() {
    this.booksSub = this.libraryService.books
      .subscribe(books => {
        this.books = books.data;
        this.isLoading = books.isLoading;
        this.error = books.error;
      });

    this.filtersSub = this.libraryService.filters
      .subscribe(filters => {
        this.filters = filters;
        this.libraryService.handleSearching(filters);
      });
  }

  ngOnDestroy() { }
}
