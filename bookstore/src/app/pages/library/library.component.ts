import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerError } from 'src/app/models/others/ServerError';
import { Book, BooksFilterConfig } from 'src/app/models/entities/Book';
import { LibraryService } from './LibraryService';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { KindsService } from 'src/app/services/KindsService';

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

  changeSortCategory({ value: sortBy }: { value: 'averageOfRatings' | 'price' | 'name' }) {
    console.log(sortBy);
    this.libraryService.changeFilters({
      sortOrder: `${sortBy}_${this.sortOrder}`
    });
  }

  changeSortOrder({ value: order }: { value: 'asc' | 'desc' }) {
    console.log(order);
    this.libraryService.changeFilters({
      sortOrder: `${this.sortingBy}_${order === order ? 'desc' : 'asc'}`
    });
  }


  // handleKindClick(id: number) {
  //   const kindOfBookId: number = target.dataset.sectionvalue;
  //   if (kindOfBookId !== null) {
  //     this.libraryService.changeFilters({ kindOfBookId });
  //   }
  // }

  ngOnDestroy() { }
}
