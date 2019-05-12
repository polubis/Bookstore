import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';
import { OrderItem } from '../models/entities/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private apiService: ApiService) {
  }

  createOrder(orderItems: OrderItem[]): Observable<any> {
    const cartItems: { bookId: number, quantity: number }[] = orderItems.map(({ id, quantity }: OrderItem) => {
      return { bookId: +id, quantity };
    });

    return this.apiService.execute('orders/submitOrder', 'post', { cartItems });
  }
}
