import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { KindsService } from 'src/app/services/KindsService';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { Kind } from 'src/app/models/entities/Kind';

@Component({
  selector: 'app-kind-of-book-form',
  templateUrl: './kind-of-book-form.component.html',
  styleUrls: ['./kind-of-book-form.component.scss']
})
export class KindOfBookFormComponent implements OnInit {

  isSaving = false;

  constructor(
    private dialogRef: MatDialogRef<KindOfBookFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public kindOfBookPayload: { kindOfBookName: string, kindOfBookId: number },
    private kindsService: KindsService
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

  handleSubmit() {
    this.isSaving = true;

    if (this.kindOfBookPayload) {
      this.kindsService.editKind({
        id: this.kindOfBookPayload.kindOfBookId,
        name: this.kindOfBookForm.value.kindOfBookName
      })
        .subscribe(
          () => {
            this.isSaving = false;
            this.snackBar.open('Gatunek został pomyślnie zaktualizowany', 'ZAMKNIJ', {
              duration: 2000,
              panelClass: ['succ-snackbar']
            });
          },
          () => {
            this.isSaving = false;
          }
        );
    } else {
      this.kindsService.addKind({
        name: this.kindOfBookForm.value.kindOfBookName
      })
        .subscribe(
          ({ successResult: kind }: RequestResponse<Kind>) => {
            this.isSaving = false;
            this.snackBar.open('Pomyślnie dodano gatunek', 'ZAMKNIJ', {
              duration: 2000,
              panelClass: ['succ-snackbar']
            });
            this.kindOfBookForm.setValue({
              kindOfBookName: ''
            });
            // this.kindsService.putKindInKinds(kind); when adam adds just uncomment
          },
          () => {
            this.isSaving = false;

          }
        );
    }


  }

}
