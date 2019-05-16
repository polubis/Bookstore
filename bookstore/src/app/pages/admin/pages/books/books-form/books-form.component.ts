import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent implements OnInit {

  isSaving = false;

  constructor(private dialogRef: MatDialogRef<BooksFormComponent>) { }

  ngOnInit() {
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.isSaving = true;
  }
}
