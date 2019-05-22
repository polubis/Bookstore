import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/ApiService';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  constructor(
    private apiService: ApiService
    ) {
  }

  getAllOrders({ page, pageSize }: { page: number, pageSize: number }) {
    return this.apiService.execute('orders/getAllOrders', 'get', {}, `/?page=${page}&pageSize=${pageSize}`);
  }
}
