import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from 'src/app/services/BooksService';
import { Book } from 'src/app/models/entities/Book';
import { DataEnhancer } from 'src/app/models/others/DataEnhancer';
import { ServerError } from 'src/app/models/others/ServerError';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-details-popup',
  templateUrl: './book-details-popup.component.html',
  styleUrls: ['./book-details-popup.component.scss']
})
export class BookDetailsPopupComponent implements OnInit, OnDestroy {

  book: Book;
  isLoading = false;
  error: ServerError;
  sub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private dialogRef: MatDialogRef<BookDetailsPopupComponent>,
    private booksService: BooksService) { }

  ngOnInit() {
    const bookId = this.data.id;
    this.sub = this.booksService.bookDetailsCache.subscribe((booksCache: { [key: number]: DataEnhancer<Book> }) => {
      const isBookInsertedToCache = booksCache.hasOwnProperty(bookId);
      if (!isBookInsertedToCache) {
        this.booksService.getBook(bookId);
      }
      if (isBookInsertedToCache) {
        const book = booksCache[bookId].data;
        this.isLoading = booksCache[bookId].isLoading;
        this.error = booksCache[bookId].error;

        if (book) {
          this.book = { ...book, pictureName: book.pictureName ? `${environment.bookPicture}${book.pictureName}` : '' };
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
