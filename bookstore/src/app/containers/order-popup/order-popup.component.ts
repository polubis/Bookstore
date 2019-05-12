import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/AuthService';
import { BucketService } from 'src/app/services/BucketService';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Bucket } from 'src/app/models/entities/Bucket';
import { map, tap } from 'rxjs/operators';
import { Book } from 'src/app/models/entities/Book';

@AutoUnsubscribe()
@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit, OnDestroy {

  constructor(private dialogRef: MatDialogRef<OrderPopupComponent>,
    private authService: AuthService, private bucketService: BucketService) { }

  sub: Subscription;
  orderItems: Book | { quantity: number }[];
  size: number;
  cost: number;

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
    ).subscribe((orderItems: Book | { quantity: number }[]) => {
      console.log(orderItems);
      this.orderItems = orderItems;
    });
  }

  closePopup() {
    this.dialogRef.close();
  }

  ngOnDestroy() {}
}
