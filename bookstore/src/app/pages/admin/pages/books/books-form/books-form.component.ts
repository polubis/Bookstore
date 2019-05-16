import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
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

  booksFormData: AddBookPayload = {
    name: '',
    author: '',
    printer: '',
    kindOfBookName: '',
    price: 0,
    description: '',
    pictureBook: ''
  };

  constructor(private dialogRef: MatDialogRef<BooksFormComponent>, private booksService: BooksService) { }

  ngOnInit() {
  }

  @debounceEvent(100)
  onChangeInput({ target }: any) {
    this.booksFormData = { ...this.booksFormData, [target.name]: target.value };
  }

  onChangeFileInput(e: any) {
    this.booksFormData = {
      ...this.booksFormData,
      pictureBook: ''
    };
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.isSaving = true;
    this.booksService.addBook(this.booksFormData)
      .subscribe(
        data => {
          console.log(data);
          this.isSaving = false;
        },
        err => {
          console.log(err);
          this.isSaving = false;
        }
      );
  }
}
