import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerError } from 'src/app/models/others/ServerError';
import { Book, BooksFilterConfig } from 'src/app/models/entities/Book';
import { LibraryService } from './LibraryService';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { KindsService } from 'src/app/services/KindsService';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';

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
  sortingBy = 'name';
  sortOrder = 'asc';
  category = 'searchTitle';

  constructor(
    private libraryService: LibraryService,
    private kindsService: KindsService
  ) { }

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

    this.kindsService.getKinds();
  }

  handleKindClick(kindOfBookId: number | undefined) {
    this.libraryService.changeFilters({ kindOfBookId });
  }

  @debounceEvent(250)
  changeSortCategory({ value: sortBy }: { value: 'averageOfRatings' | 'price' | 'name' }) {
    this.libraryService.changeFilters({
      sortOrder: `${sortBy}_${this.sortOrder}`
    });
  }

  @debounceEvent(250)
  changeSortOrder({ value: order }: { value: 'asc' | 'desc' }) {
    this.libraryService.changeFilters({
      sortOrder: `${this.sortingBy}_${order === order ? 'desc' : 'asc'}`
    });
  }

  @debounceEvent(250)
  changePrices(minPrice = this.filters.minPrice, maxPrice = this.filters.maxPrice) {
    this.libraryService.changeFilters({ minPrice, maxPrice });
  }

  handleSearching(value: string) {
    this.libraryService.changeFilters({ [this.category]: value });
  }

  changeSearchCategory(category: string) {
    const { searchTitle, searchAuthor, searchPrinter } = this.filters;
    if (searchTitle || searchAuthor || searchPrinter) {
      this.libraryService.changeFilters({
        searchTitle: searchTitle && undefined,
        searchAuthor: searchAuthor && undefined,
        searchPrinter: searchPrinter && undefined,
        [category]: this.filters[this.category]
      });
    }
    this.category = category;
  }

  ngOnDestroy() { }
}
