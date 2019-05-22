import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { Printer } from '../models/entities/Printer';
import { RequestResponse } from '../models/others/RequestResponse';
import { ServerError } from '../models/others/ServerError';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrintersService {

  printers = new BehaviorSubject<DataEnhancer<Printer[]>>({ isLoading: true, data: [] });

  constructor(private apiService: ApiService) {

  }

  getPrinters() {
    this.printers.pipe(take(1))
      .subscribe(kinds => {
        if (kinds.data.length === 0) {
          this.printers.next({ isLoading: true, error: null, data: [] });

          this.apiService.execute('printers')
            .subscribe(
              (value: RequestResponse<Printer[]>) => {
                this.printers.next({
                  isLoading: false,
                  error: null,
                  data: value.successResult
                });
              },
              ({ message, code }: ServerError) => {
                this.printers.next({ isLoading: false, error: { message, code }, data: [] });
              }
            );
        }
      });
  }

  changePrinterInPrinters(newPrinter: Printer) {
    this.printers.pipe(take(1))
      .subscribe(printers => {
        this.printers.next({
          ...printers,
          data: printers.data.map(printer => {
            return printer.id === newPrinter.id ? newPrinter : printer;
          })
        });
      });
  }

  putPrinterInPrinters(printer: Printer) {
    this.printers.pipe(take(1))
      .subscribe(printers => {
        this.printers.next(
          { ...printers, data: [printer, ...printers.data] }
        );
      });
  }

  deletePrinterFromPrinters(printerId: number) {
    this.printers.pipe(take(1))
      .subscribe(printers => {
        this.printers.next({
          ...printers,
          data: printers.data.filter(({ id }) => id !== printerId)
        });
      });
  }

  addPrinter(name: string) {
    return this.apiService.execute('printers/add', 'post', { name });
  }

  editPrinter(printer: Printer) {
    return this.apiService.execute('printers', 'patch', { name: printer.name }, `/${printer.id}`);
  }

  deletePrinter(id: number) {
    return this.apiService.execute('printers', 'delete', {}, `/${id}`);
  }
}
