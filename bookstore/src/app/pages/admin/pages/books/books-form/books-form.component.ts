import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from 'src/app/services/BooksService';
import { AddBookPayload, Book } from 'src/app/models/entities/Book';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';
import { environment } from '../../../../../../environments/environment';
import { RequestResponse } from 'src/app/models/others/RequestResponse';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent implements OnInit {

  isSaving = false;
  isAddingFile = false;

  pictureBookPreview: string | ArrayBuffer;

  booksFormData: AddBookPayload = {
    name: '',
    author: '',
    printer: '',
    kindOfBookName: '',
    price: '',
    description: '',
    pictureBook: ''
  };

  constructor(
    private dialogRef: MatDialogRef<BooksFormComponent>,
    private booksService: BooksService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public bookPayload: AddBookPayload) { }

  ngOnInit() {
    if (this.bookPayload) {
      this.booksFormData = {
        ...this.bookPayload,
        pictureBook: this.bookPayload.pictureBook ?
          `${environment.bookPicture}${this.bookPayload.pictureBook}` : ''
      };
    }
  }

  @debounceEvent(100)
  onChangeInput({ target }: any) {
    this.booksFormData = { ...this.booksFormData, [target.name]: target.value };
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

  handleSubmit(e: any) {
    e.preventDefault();
    this.isSaving = true;
    this.booksService.createBook(this.booksFormData)
      .subscribe(
        ({ successResult: book }: RequestResponse<Book>) => {
          this.snackBar.open('Pomyślnie dodano książkę', 'ZAMKNIJ', {
            duration: 2000,
            panelClass: ['succ-snackbar']
          });
          this.dialogRef.close();
        },
        err => {
          this.isSaving = false;
        }
      );
  }
}
