import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { PrintersService } from 'src/app/services/PrintersService';

@Component({
  selector: 'app-printer-form',
  templateUrl: './printer-form.component.html',
  styleUrls: ['./printer-form.component.scss']
})
export class PrinterFormComponent implements OnInit {

  isSaving = false;

  constructor(
    private dialogRef: MatDialogRef<PrinterFormComponent>,
    private snackBar: MatSnackBar,
    private printersService: PrintersService,
    @Inject(MAT_DIALOG_DATA) public printerPayload: { printer: string, printerId: number }
  ) { }

  printerForm = new FormGroup({
    printer: new FormControl('')
  });

  ngOnInit() {
    if (this.printerPayload) {
      this.printerForm.setValue({
        printer: this.printerPayload.printer
      });
    }
  }

  handleSubmit() {
    this.isSaving = true;
    if (this.printerPayload) {
      this.printersService.editPrinter({
        name: this.printerForm.value.printer,
        id: this.printerPayload.printerId
      })
        .subscribe(
          () => {
            this.isSaving = false;
            this.snackBar.open('Wydawnictwo zostało pomyślnie zaktualizowane', 'ZAMKNIJ', {
              duration: 2000,
              panelClass: ['succ-snackbar']
            });
          },
          () => {
            this.isSaving = false;
          }
        );
    } else {
      this.printersService.addPrinter(this.printerForm.value.printer)
        .subscribe(
          () => {
            this.isSaving = false;
            this.printerForm.setValue({
              printer: ''
            });
            this.snackBar.open('Wydawnictwo zostało pomyślnie dodane', 'ZAMKNIJ', {
              duration: 2000,
              panelClass: ['succ-snackbar']
            });
          },
          () => {
            this.isSaving = false;
          }
        );
    }
  }

}
