import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-kind-of-book-form',
  templateUrl: './kind-of-book-form.component.html',
  styleUrls: ['./kind-of-book-form.component.scss']
})
export class KindOfBookFormComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<KindOfBookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public kindOfBookPayload: { kindOfBookName: string, kindOfBookId: number }
  ) { }

  kindOfBookForm = new FormGroup({
    kindOfBookName: new FormControl
  });

  ngOnInit() {
    if (this.kindOfBookPayload) {
      this.kindOfBookForm.setValue({
        kindOfBookName: this.kindOfBookPayload.kindOfBookName
      });
    }
  }

}
