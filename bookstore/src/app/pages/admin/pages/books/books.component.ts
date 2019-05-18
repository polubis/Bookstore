import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from 'src/app/services/BooksService';
import { Books, SlimBook, BooksFilterConfig } from 'src/app/models/entities/Book';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { BooksTable } from 'src/app/models/entities/Order';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { FiltersService } from 'src/app/services/FiltersService';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AdminBooksService } from './AdminBooksService';

@AutoUnsubscribe()
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  books: SlimBook[];

  subscription: Subscription;

  constructor(
    private booksService: BooksService,
    private uiService: UserInterfaceService,
    private filtersService: FiltersService,
    private adminBooksService: AdminBooksService
  ) { }

  columns: BooksTable[] = [
    { key: 'id', name: 'Identyfikator' },
    { key: 'name', name: 'Nazwa', sortable: true },
    { key: 'author', name: 'Autor' },
    { key: 'printer', name: 'Wydawnictwo' },
    { key: 'kindOfBook', name: 'Rodzaj książki' },
    { key: 'averageOfRatings', name: 'Średnia z ocen', sortable: true },
    { key: 'price', name: 'Cena w zł', sortable: true },
  ];

  handleGetBooks(config: BooksFilterConfig) {
    this.uiService.isLoadingOnAdmin.next(true);
    this.booksService.getBooks(config)
      .subscribe(
        ({ successResult: booksData }: RequestResponse<Books>) => {
          this.adminBooksService.books.next(booksData.results
            .map(book => this.adminBooksService.makeBookSlim(book)));
          this.uiService.isLoadingOnAdmin.next(false);
        },
        () => {
          this.uiService.isLoadingOnAdmin.next(false);
        },

      );
  }

  ngOnInit() {
    this.subscription = this.filtersService.filtersConfig.subscribe(config => {
      this.handleGetBooks(config);
    });
  }

  ngOnDestroy() { }
}
