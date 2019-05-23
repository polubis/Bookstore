import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from 'src/app/services/BooksService';
import { AddBookPayload, Book } from 'src/app/models/entities/Book';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { AdminBooksService } from 'src/app/pages/admin/pages/books/AdminBooksService';
import { KindsService } from 'src/app/services/KindsService';
import { DataEnhancer } from 'src/app/models/others/DataEnhancer';
import { Kind } from 'src/app/models/entities/Kind';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { PrintersService } from 'src/app/services/PrintersService';
import { Printer } from 'src/app/models/entities/Printer';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent implements OnInit, OnDestroy {

  isSaving = false;
  isAddingFile = false;

  printersSub: Subscription;
  printers: DataEnhancer<Printer[]> = { isLoading: false, data: [] };

  kindsSub: Subscription;
  kinds: DataEnhancer<Kind[]> = { isLoading: false, data: [] };

  public form: FormGroup = new FormGroup({
    kindOfBookName: new FormControl(''),
  });

  pictureBookPreview: string | File | ArrayBuffer;

  booksFormData: AddBookPayload = {
    name: '',
    author: '',
    printer: '',
    kindOfBookName: '',
    price: '',
    description: '',
    pictureBook: ''
  };

  kindOfBookNameFormControl = new FormControl();

  constructor(
    private dialogRef: MatDialogRef<BooksFormComponent>,
    private booksService: BooksService,
    private snackBar: MatSnackBar,
    private adminBooksService: AdminBooksService,
    private kindsService: KindsService,
    private printersService: PrintersService,
    @Inject(MAT_DIALOG_DATA) public bookPayload: { bookPayload: AddBookPayload, bookId: number }) { }

  ngOnInit() {
    this.kindsService.getKinds();
    this.printersService.getPrinters();

    this.kindsSub = this.kindsService.kinds.subscribe(kinds => {
      this.kinds = kinds;
    });

    this.printersSub = this.printersService.printers.subscribe(printers => {
      this.printers = printers;
    });

    if (this.bookPayload) {
      this.booksFormData = { ...this.bookPayload.bookPayload };
      this.pictureBookPreview = this.bookPayload.bookPayload.pictureBook;
    }
  }

  ngOnDestroy() {
    this.kindsSub.unsubscribe();
  }

  @debounceEvent(100)
  onChangeInput({ target }: any) {
    this.booksFormData = { ...this.booksFormData, [target.name]: target.value };
  }
  @debounceEvent(100)
  onChangeKind(kindOfBookName: string) {
    this.booksFormData = { ...this.booksFormData, kindOfBookName };
  }

  @debounceEvent(100)
  onChangePrinter(printer: string) {
    this.booksFormData = { ...this.booksFormData, printer };
  }

  onChangeFileInput({ target }: Event) {
    this.isAddingFile = true;
    const file = (target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.booksFormData = {
        ...this.booksFormData,
        pictureBook: file
      };
      this.pictureBookPreview = reader.result;
      this.isAddingFile = false;
    };
    reader.readAsDataURL(file);
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    this.isSaving = true;
    if (this.bookPayload) {
      this.booksService.editBook(this.bookPayload.bookId, this.booksFormData)
        .subscribe(
          (book) => {
            this.isSaving = false;
            this.snackBar.open('Pomyślnie edytowano książkę', 'ZAMKNIJ', {
              duration: 2000,
              panelClass: ['succ-snackbar']
            });
            this.dialogRef.close();
            this.booksService.removeBookFromCache(this.bookPayload.bookId);
            this.adminBooksService.updateBook(book.successResult);
          },
          () => {
            this.isSaving = false;
          }
        );
    } else {
      this.booksService.createBook(this.booksFormData)
        .subscribe(
          ({ successResult: book }: RequestResponse<Book>) => {
            this.snackBar.open('Pomyślnie dodano książkę', 'ZAMKNIJ', {
              duration: 2000,
              panelClass: ['succ-snackbar']
            });
            this.dialogRef.close();
            this.adminBooksService.addBook(book);
          },
          () => {
            this.isSaving = false;
          }
        );
    }

  }
}
