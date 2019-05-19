import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { BooksService } from 'src/app/services/BooksService';
import { Book, AddBookPayload } from 'src/app/models/entities/Book';
import { DataEnhancer } from 'src/app/models/others/DataEnhancer';
import { ServerError } from 'src/app/models/others/ServerError';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminBooksService } from 'src/app/pages/admin/pages/books/AdminBooksService';
import { BooksFormComponent } from '../books-form/books-form.component';

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
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private dialog: MatDialog,
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
    const dialogConfig = new MatDialogConfig();
    const { book } = this as any;

    const bookPayload: AddBookPayload = {
      name: book.name,
      author: book.author,
      price: book.price,
      printer: book.printer || '',
      kindOfBookName: book.kindOfBook.name,
      description: book.description,
      pictureBook: book.pictureName
    };
    dialogConfig.data = { bookPayload, bookId: book.id };

    this.dialog.open(BooksFormComponent, dialogConfig);
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
