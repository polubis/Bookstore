import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from 'src/app/services/BooksService';

@Component({
  selector: 'app-book-details-popup',
  templateUrl: './book-details-popup.component.html',
  styleUrls: ['./book-details-popup.component.scss']
})
export class BookDetailsPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private dialogRef: MatDialogRef<BookDetailsPopupComponent>,
    private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getBook(this.data.id);
  }

}
