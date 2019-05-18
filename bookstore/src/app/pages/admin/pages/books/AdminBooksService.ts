import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SlimBook, Book } from 'src/app/models/entities/Book';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminBooksService {
  books = new BehaviorSubject<SlimBook[]>([]);

  addBook(book: Book) {
    console.log(book);
    this.books.pipe(take(1))
      .subscribe(books => {
        this.books.next([this.makeBookSlim(book), ...books]);
      });
  }

  makeBookSlim({ id, name, pictureName, description, price, author, printer, kindOfBook, averageOfRatings }: Book): SlimBook {
    return {
      id,
      name,
      price,
      description,
      author: author.name,
      pictureName: pictureName ? `${environment.bookPicture}${pictureName}` : '',
      printer: printer.name,
      kindOfBookName: kindOfBook.name,
      averageOfRatings
    };
  }
}
