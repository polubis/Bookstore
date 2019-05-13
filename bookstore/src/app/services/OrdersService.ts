import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';
import { OrderItem, Order } from '../models/entities/Order';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { ServerError } from '../models/others/ServerError';
import { RequestResponse } from '../models/others/RequestResponse';
import { PaginationWrapper } from '../models/others/PaginationWrapper';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private apiService: ApiService) {
  }

  orders = new BehaviorSubject<DataEnhancer<PaginationWrapper<Order>>>({ isLoading: false, error: null, data: { results: [] } });

  createOrder(orderItems: OrderItem[]): Observable<any> {
    const cartItems: { bookId: number, quantity: number }[] = orderItems.map(({ id, quantity }: OrderItem) => {
      return { bookId: +id, quantity };
    });

    return this.apiService.execute('orders/submitOrder', 'post', { cartItems });
  }

  getOrdersByUsername = (username: string) => {
    this.orders.next({ isLoading: true, error: null, data: { results: [] } });
    const path = `/${username}?page=1&pageSize=500`;
    this.apiService.execute('orders/getOrders', 'get', {}, path)
      .subscribe(
        ({ successResult: paginatedOrders }: RequestResponse<PaginationWrapper<Order>>) => {
          console.log(paginatedOrders);
          this.orders.next({ isLoading: false, error: null, data: paginatedOrders });
        },
        (error: ServerError) => {
          this.orders.next({ isLoading: false, error, data: { results: [] }});
        }
      );
  }
}
