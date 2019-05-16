import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/BooksService';
import { Books, SlimBook, Book, BooksFilterConfig } from 'src/app/models/entities/Book';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { BooksTable } from 'src/app/models/entities/Order';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  isLoadingBooks: boolean;
  books: SlimBook[];

  constructor(private booksService: BooksService, private uiService: UserInterfaceService) { }

  columns: BooksTable[] = [
    { key: 'id', name: 'Identyfikator' },
    { key: 'pictureName', name: 'Zdjęcie', icon: 'image' },
    { key: 'name', name: 'Nazwa', sortable: true },
    { key: 'author', name: 'Autor' },
    { key: 'printer', name: 'Wydawnictwo' },
    { key: 'kindOfBook', name: 'Rodzaj książki' },
    { key: 'averageOfRatings', name: 'Średnia z ocen', sortable: true },
    { key: 'price', name: 'Cena w zł', sortable: true },
  ];

  handleGetBooks(filters?: BooksFilterConfig) {
    this.isLoadingBooks = true;
    this.uiService.isLoadingOnAdmin.next(true);
    console.log(filters);
    this.booksService.getBooks(filters || { page: 1, pageSize: 9, sortOrder: 'name_asc' })
    .subscribe(
      ({ successResult: booksData }: RequestResponse<Books>) => {
        this.books = booksData.results.map(({ id, name, pictureName, price, author, printer, kindOfBook, averageOfRatings }: Book) => {
          return {
            id,
            name,
            price,
            author: author.name,
            pictureName,
            printer: printer.name,
            kindOfBookName: kindOfBook.name,
            averageOfRatings
          } as SlimBook;
        });
        this.isLoadingBooks = false;
        this.uiService.isLoadingOnAdmin.next(false);
      },
      (err) => {
        console.log(err);
        this.isLoadingBooks = false;
        this.uiService.isLoadingOnAdmin.next(false);
      },

    );
  }

  ngOnInit() {
    this.handleGetBooks();
  }

  getBooksByFiltersChange(filters: BooksFilterConfig) {
    this.handleGetBooks(filters);
  }

}
