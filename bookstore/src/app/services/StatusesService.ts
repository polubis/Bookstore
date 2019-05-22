import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { RequestResponse } from '../models/others/RequestResponse';
import { OrderStatus } from '../pages/admin/pages/orders/models';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {

  statuses = new BehaviorSubject<DataEnhancer<OrderStatus[]>>({ isLoading: true, data: [] });

  constructor(private apiService: ApiService) {

  }

  getStatuses() {
    this.statuses.next({
      isLoading: true,
      error: null,
      data: []
    });
    this.apiService.execute('statuses')
      .subscribe(
        ({ successResult: statuses }: RequestResponse<OrderStatus[]>) => {
          this.statuses.next({
            isLoading: false,
            error: null,
            data: statuses
          });
        },
        error => {
          this.statuses.next({
            isLoading: false,
            error,
            data: []
          });
        }
      );
  }
}
