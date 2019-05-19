import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { Printer } from '../models/entities/Printer';

@Injectable({
  providedIn: 'root'
})
export class PrintersService {

  printers = new BehaviorSubject<DataEnhancer<Printer[]>>({ isLoading: true, data: [] });

  constructor(private apiService: ApiService) {

  }

  addPrinter(name: string) {
    return this.apiService.execute('printers/add', 'post', { name });
  }

  editPrinter(printer: Printer) {
    return this.apiService.execute('printers', 'patch', { name: printer.name }, `${printer.id}`);
  }
}
