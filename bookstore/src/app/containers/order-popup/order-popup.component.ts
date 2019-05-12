import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/AuthService';
import { BucketService } from 'src/app/services/BucketService';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Bucket } from 'src/app/models/entities/Bucket';
import { map, tap } from 'rxjs/operators';
import { Book } from 'src/app/models/entities/Book';
import { OrdersService } from 'src/app/services/OrdersService';
import { OrderItem, Order } from 'src/app/models/entities/Order';
import { RequestResponse } from 'src/app/models/others/RequestResponse';

@AutoUnsubscribe()
@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit, OnDestroy {

  constructor(private dialogRef: MatDialogRef<OrderPopupComponent>,
    private authService: AuthService, private bucketService: BucketService,
    private ordersService: OrdersService) { }

  sub: Subscription;
  orderItems: OrderItem[];
  size: number;
  cost: number;
  isSavingOrder = false;
  createdOrderDetails: Order | null = null;

  ngOnInit() {
    this.sub = this.bucketService.bucket.pipe(
      tap((bucket: Bucket) => {
        this.size = bucket.size;
        this.cost = bucket.cost;
      }),
      map((bucket: Bucket) => {
        return Object.values(bucket.items).map(({ quantity, book }: { quantity: number, book: Book }) => {
          return { ...book, quantity };
        });
      })
    ).subscribe((orderItems: OrderItem[]) => {
      this.orderItems = orderItems;
    });
  }

  closePopup() {
    if (!this.isSavingOrder) {
      this.dialogRef.close();
    }
  }

  createOrder() {
    this.isSavingOrder = true;

    this.ordersService.createOrder(this.orderItems)
      .subscribe(
        ({ successResult: createdOrder }: RequestResponse<Order>) => {
          this.isSavingOrder = false;
          this.createdOrderDetails = createdOrder;
          this.bucketService.clearBucket();
        },
        () => {
          this.isSavingOrder = false;
          this.createdOrderDetails = null;
        }
      );
  }

  ngOnDestroy() {}
}
