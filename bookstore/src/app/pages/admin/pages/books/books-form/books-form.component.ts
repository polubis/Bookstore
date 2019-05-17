import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from 'src/app/services/BooksService';
import { AddBookPayload } from 'src/app/models/entities/Book';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';

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
    price: 0,
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
      this.booksFormData = { ...this.bookPayload };
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
    this.booksService.addBook(this.booksFormData)
      .subscribe(
        data => {
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
