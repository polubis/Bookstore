import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataEnhancer } from 'src/app/models/others/DataEnhancer';
import { Book, BooksFilterConfig, Books } from 'src/app/models/entities/Book';
import { BooksService } from 'src/app/services/BooksService';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  books = new BehaviorSubject<DataEnhancer<Book[]>>({ isLoading: true, data: [] });
  filters = new BehaviorSubject<BooksFilterConfig>({
    page: 1,
    pageSize: 50
  });

  constructor(private booksService: BooksService) { }

  private getCurrentFiltersSnapshot = () =>
    this.filters.pipe(take(1))

  handleSearching(config: BooksFilterConfig) {
    this.books.next({
      isLoading: true,
      error: null,
      data: []
    });

    this.booksService.getBooks(config)
      .subscribe(
        ({ successResult }: RequestResponse<Books>) => {
          this.books.next({
            isLoading: false,
            error: null,
            data: this.booksService.prepareBooksPictures(successResult.results)
          });
        },
        error => {
          this.books.next({
            isLoading: false,
            error,
            data: []
          });
        }
      );
  }

  changeFilters(incomingFilters: BooksFilterConfig) {
    this.getCurrentFiltersSnapshot()
      .subscribe(filters => {
        this.filters.next({
          ...filters, ...incomingFilters
        });
      });
  }
}
