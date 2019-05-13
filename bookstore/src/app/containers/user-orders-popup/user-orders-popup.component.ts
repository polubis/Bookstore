import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrdersService } from 'src/app/services/OrdersService';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { DataEnhancer } from 'src/app/models/others/DataEnhancer';
import { Order } from 'src/app/models/entities/Order';
import { PaginationWrapper } from 'src/app/models/others/PaginationWrapper';

@AutoUnsubscribe()
@Component({
  selector: 'app-user-orders-popup',
  templateUrl: './user-orders-popup.component.html',
  styleUrls: ['./user-orders-popup.component.scss']
})
export class UserOrdersPopupComponent implements OnInit, OnDestroy {

  orderSub: Subscription;
  orders: DataEnhancer<PaginationWrapper<Order>>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { username: string },
    private dialogRef: MatDialogRef<UserOrdersPopupComponent>, private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getOrdersByUsername(this.data.username);
    this.orderSub = this.ordersService.orders.subscribe(orders => {
      this.orders = orders;
    });
  }

  ngOnDestroy() {}
}
