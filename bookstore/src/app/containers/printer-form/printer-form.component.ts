import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-printer-form',
  templateUrl: './printer-form.component.html',
  styleUrls: ['./printer-form.component.scss']
})
export class PrinterFormComponent implements OnInit {

  isSaving = false;

  constructor(
    private dialogRef: MatDialogRef<PrinterFormComponent>,
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

  }

}
