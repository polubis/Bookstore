import { Component, OnInit, Inject, OnDestroy, forwardRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BooksService } from 'src/app/services/BooksService';
import { Book } from 'src/app/models/entities/Book';
import { DataEnhancer } from 'src/app/models/others/DataEnhancer';
import { ServerError } from 'src/app/models/others/ServerError';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminBooksService } from 'src/app/pages/admin/pages/books/AdminBooksService';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';

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

  wantDeleteBook = false;
  isSaving = false;

  constructor(
    @Inject(forwardRef(() => UserInterfaceService)) private uiService: UserInterfaceService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private dialogRef: MatDialogRef<BookDetailsPopupComponent>,
    private booksService: BooksService,
    private adminBooksService: AdminBooksService,
    private snackBar: MatSnackBar,
    ) { }

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
    if (!this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

  toggleWantDeleteBook() {
    this.wantDeleteBook = !this.wantDeleteBook;
  }

  goToBookEdition() {
    this.uiService.openBooksForm(this.book);
    this.dialogRef.close();
  }

  handleDeleteBook() {
    this.isSaving = true;
    this.booksService.deleteBook(this.data.id)
      .subscribe(
        () => {
          this.sub.unsubscribe();
          this.adminBooksService.removeBook(this.data.id);
          this.booksService.removeBookFromCache(this.data.id);
          this.snackBar.open('Pomyślnie usunięto książkę', 'ZAMKNIJ', {
            duration: 2000,
            panelClass: ['succ-snackbar']
          });
          this.dialogRef.close();
        },
        () => {
          this.isSaving = false;
        }
      );
  }
}
