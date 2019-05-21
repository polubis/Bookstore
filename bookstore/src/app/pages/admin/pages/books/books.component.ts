import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from 'src/app/services/BooksService';
import { Books, BooksFilterConfig } from 'src/app/models/entities/Book';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { BooksTable } from 'src/app/models/entities/Order';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { FiltersService } from 'src/app/services/FiltersService';
import { Subscription, of } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AdminBooksService } from './AdminBooksService';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { KindOfBookFormComponent } from 'src/app/containers/kind-of-book-form/kind-of-book-form.component';
import { PrinterFormComponent } from 'src/app/containers/printer-form/printer-form.component';
import { PaginationData } from 'src/app/models/others/PaginationWrapper';
import { debounceTime, switchMap, catchError, tap } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  booksPaginationData: PaginationData;

  constructor(
    private booksService: BooksService,
    private uiService: UserInterfaceService,
    private filtersService: FiltersService,
    private adminBooksService: AdminBooksService,
    private dialog: MatDialog
  ) { }

  columns: BooksTable[] = [
    { key: 'id', name: 'Identyfikator' },
    { key: 'name', name: 'Nazwa', sortable: true },
    { key: 'author', name: 'Autor' },
    { key: 'printer', name: 'Wydawnictwo' },
    { key: 'kindOfBookName', name: 'Rodzaj książki' },
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
          delete booksData.results;
          this.booksPaginationData = booksData;
        },
        () => {
          this.uiService.isLoadingOnAdmin.next(false);
        },

      );
  }

  openPrinterForm() {
    const config = new MatDialogConfig();
    this.dialog.open(KindOfBookFormComponent, config);
  }

  openKindOfBookForm() {
    const config = new MatDialogConfig();
    this.dialog.open(PrinterFormComponent, config);
  }

  ngOnInit() {
    this.subscription = this.filtersService.filtersConfig
    .pipe(
      debounceTime(200),
      switchMap((config: BooksFilterConfig) => {
        return of(this.handleGetBooks(config));
      })
    )
    .subscribe();
  }

  ngOnDestroy() { }
}
