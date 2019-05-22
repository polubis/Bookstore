import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/ApiService';

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

  changeOrderStatus(orderId: number, statusId: number) {
    return this.apiService.execute('orders/changeStatus', 'patch', { }, `/${orderId}?statusId=${statusId}`);
  }
}
