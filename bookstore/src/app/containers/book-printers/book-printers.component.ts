import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Kind } from 'src/app/models/entities/Kind';
import { FormGroup, FormControl } from '@angular/forms';
import { KindsService } from 'src/app/services/KindsService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';
import { PrintersService } from 'src/app/services/PrintersService';
import { Printer } from 'src/app/models/entities/Printer';
import { RequestResponse } from 'src/app/models/others/RequestResponse';

@Component({
  selector: 'app-book-printers',
  templateUrl: './book-printers.component.html',
  styleUrls: ['./book-printers.component.scss']
})
export class BookPrintersComponent implements OnInit, OnDestroy {

  sub: Subscription;
  printers: Printer[] = [];
  isLoading: boolean;

  selectedPrinter: Printer = { id: -1, name: '' };
  isDeleting: boolean;

  isAdding: boolean;

  printersForm = new FormGroup({
    printerName: new FormControl
  });

  isEditing: boolean;
  wantEdit: boolean;

  constructor(
    private printersService: PrintersService,
    private dialogRef: MatDialogRef<BookPrintersComponent>,
    @Inject(MAT_DIALOG_DATA) public printerPayload: { id: number, name: string }
  ) { }

  ngOnInit() {
    this.sub = this.printersService.printers.subscribe(
      ({ data, isLoading }) => {
        this.printers = data;
        this.isLoading = isLoading;
      }
    );
    if (this.printerPayload) {
      this.toggleWantEdit();
      this.selectedPrinter = this.printerPayload;
      this.printersForm.setValue({
        printerName: this.printerPayload.name
      });
    }
    this.printersService.getPrinters();
  }

  selectPrinter(printer: Printer) {
    if (this.wantEdit) {
      this.printersForm.setValue({
        printerName: printer.name
      });
    }
    this.selectedPrinter = printer;
  }

  toggleWantEdit() {
    this.wantEdit = !this.wantEdit;
  }

  toggleEditing() {
    this.printersForm.setValue({
      printerName: this.selectedPrinter.name
    });
    this.toggleWantEdit();
  }

  handleDeletePrinter() {
    this.isDeleting = true;
    this.printersService.deletePrinter(this.selectedPrinter.id)
      .subscribe(
        book => {
          this.printersService.deletePrinterFromPrinters(this.selectedPrinter.id);
          this.isDeleting = false;
          this.selectedPrinter = this.printers[0] || { id: -1, name: '' };
          if (this.wantEdit) {
            this.printersForm.setValue({
              printerName: this.selectedPrinter.name
            });
          }
        },
        err => {
          this.isDeleting = false;
        }
      );
  }

  @debounceEvent(150)
  handleSubmit() {
    if (this.wantEdit) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  }

  handleAdd() {
    this.isAdding = true;

    this.printersService.addPrinter(this.printersForm.value.printerName)
      .subscribe(
        ({ successResult: printer }: RequestResponse<Printer>) => {
          this.isAdding = false;
          this.printersForm.setValue({
            printerName: ''
          });
          this.printersService.putPrinterInPrinters(printer);
        },
        () => {
          this.isAdding = false;
        }
      );
  }

  handleEdit() {
    this.isEditing = true;
    const printer = {
      id: this.selectedPrinter.id,
      name: this.printersForm.value.printerName
    };

    this.printersService.editPrinter(printer)
      .subscribe(
        () => {
          this.isEditing = false;
          this.printersService.changePrinterInPrinters(printer);
        },
        () => {
          this.isEditing = false;
        }
      );
  }

  ngOnDestroy() { }
}
