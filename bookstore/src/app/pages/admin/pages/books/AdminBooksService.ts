import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SlimBook, Book, AddBookPayload } from 'src/app/models/entities/Book';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminBooksService {
  books = new BehaviorSubject<SlimBook[]>([]);

  addBook(book: Book) {
    this.books.pipe(take(1))
      .subscribe(books => {
        this.books.next([this.makeBookSlim(book), ...books]);
      });
  }

  updateBook({ bookPayload, bookId }: { bookPayload: AddBookPayload, bookId: number }) {
    this.books.pipe(take(1))
      .subscribe(books => {
        this.books.next(
          books.map(book => {
            return +book.id === bookId ? { ...book } : book;
          })
        );
      });
  }

  makeBookSlim({ id, name, pictureName, description, price, author, printer, kindOfBook, averageOfRatings }: any): SlimBook {
    return {
      id,
      name,
      price,
      description,
      author,
      pictureName: pictureName ? `${environment.bookPicture}${pictureName}` : '',
      printer: printer.name,
      kindOfBookName: kindOfBook.name,
      averageOfRatings
    };
  }

  removeBook(bookId: number) {
    this.books.pipe(take(1))
      .subscribe(books => {
        this.books.next(
          books.filter(book => +book.id !== bookId)
        );
      });
  }
}
