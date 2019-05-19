import { Injectable } from '@angular/core';
import { RegisterComponent } from '../containers/register/register.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderPopupComponent } from '../containers/order-popup/order-popup.component';
import { UserOrdersPopupComponent } from '../containers/user-orders-popup/user-orders-popup.component';
import { ChangeUserDataPopupComponent } from '../containers/change-user-data-popup/change-user-data-popup.component';
import { BehaviorSubject } from 'rxjs';
import { BookDetailsPopupComponent } from '../containers/book-details-popup/book-details-popup.component';
import { BooksFormComponent } from '../containers/books-form/books-form.component';
import { Book, AddBookPayload } from '../models/entities/Book';

@Injectable()
export class UserInterfaceService {

  isLoadingOnAdmin = new BehaviorSubject<boolean>(true);

  constructor(private dialog: MatDialog) { }

  openRegisterForm() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(RegisterComponent, dialogConfig);
  }

  openOrderPopup() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(OrderPopupComponent, dialogConfig);
  }

  openUserOrdersPopup(username: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { username };

    this.dialog.open(UserOrdersPopupComponent, dialogConfig);
  }

  openChangeUserDataPopup() {
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(ChangeUserDataPopupComponent, dialogConfig);
  }

  openBooksForm(book?: any) {
    const dialogConfig = new MatDialogConfig();

    if (book) {
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
    }

    this.dialog.open(BooksFormComponent, dialogConfig);
  }

  openBookDetailsPopup(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id };

    this.dialog.open(BookDetailsPopupComponent, dialogConfig);
  }
}
