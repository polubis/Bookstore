import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrdersService } from 'src/app/services/OrdersService';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { DataEnhancer } from 'src/app/models/others/DataEnhancer';
import { Order } from 'src/app/models/entities/Order';
import { PaginationWrapper } from 'src/app/models/others/PaginationWrapper';
import { map, tap, take } from 'rxjs/operators';
import { ServerError } from 'src/app/models/others/ServerError';

@AutoUnsubscribe()
@Component({
  selector: 'app-user-orders-popup',
  templateUrl: './user-orders-popup.component.html',
  styleUrls: ['./user-orders-popup.component.scss']
})
export class UserOrdersPopupComponent implements OnInit, OnDestroy {

  orderSub: Subscription;
  orders: Order[] & { booksCount: number }[];
  isLoading = true;
  error: ServerError = { code: null, message: '' };

  tableHeaders = ['Identyfikator zamówienia', 'Liczba książek', 'Kwota w zł', 'Status zamówienia'];
  tableKeys = ['id', 'booksCount', 'totalPrice', 'status'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { username: string },
    private dialogRef: MatDialogRef<UserOrdersPopupComponent>, private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.orders.pipe(take(1)).subscribe(enhancedOrders => {
      if (enhancedOrders.data.results.length === 0) {
        this.ordersService.getOrdersByUsername(this.data.username);
      }
    });

    this.orderSub = this.ordersService.orders
      .pipe(
        tap(({ isLoading, error }: DataEnhancer<PaginationWrapper<Order>>) => {
          this.isLoading = isLoading;
          this.error = error;
        }),
        map(({ data }: DataEnhancer<PaginationWrapper<Order>>) => {
          return data.results.map(orderItem => {
            return {
              ...orderItem,
              booksCount: orderItem.purchasedBooks.length
            };
          });
        }),
      )
      .subscribe(orders => {
        this.orders = orders;
      });
  }

  ngOnDestroy() { }
}
