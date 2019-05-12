import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { Book } from '../models/entities/Book';
import { take } from 'rxjs/operators';
import { Bucket } from '../models/entities/Bucket';
import { CookieService } from 'ngx-cookie-service';
import { OrderItem } from '../models/entities/Order';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  bucket = new BehaviorSubject<Bucket>(this.readBucketFromCookie());

  constructor(private apiService: ApiService, private cookieService: CookieService) {
  }

  private readBucketFromCookie(): Bucket {
    const bucketAsString: string | undefined = this.cookieService.get('bucket');
    return bucketAsString ? JSON.parse(bucketAsString) : { size: 0, cost: 0, items: {} };
  }

  addBookToBucket(newBook: Book | OrderItem) {
    this.bucket.pipe(take(1)).subscribe(({ size, cost, items }: Bucket) => {
      if (items.hasOwnProperty(newBook.id)) {
        this.bucket.next({
          size: ++size,
          cost: cost + newBook.price,
          items: {
            ...items,
            [newBook.id]: {
              ...items[newBook.id], quantity: ++items[newBook.id].quantity
            }
          }
        });
      } else {
        this.bucket.next({
          size: ++size,
          cost: cost + newBook.price,
          items: {
            ...items,
            [newBook.id]: { book: newBook, quantity: 1 }
          }
        });
      }
    });
  }

  removeBookFromBucket({ id: bookId, price }: OrderItem) {
    this.bucket.pipe(take(1)).subscribe(({ size, cost, items }: Bucket) => {
      const newBucket = {
        size: --size, cost: cost - price,
        items: { ...items }
      };

      items[bookId].quantity = items[bookId].quantity - 1;

      if (newBucket.items[bookId].quantity === 0) {
        delete newBucket.items[bookId];
      }

      this.bucket.next(newBucket);
    });
  }

  clearBucket() {
    this.bucket.next({ size: 0, cost: 0, items: {} });
  }

  saveBucketAsCookie() {
    this.bucket.pipe(take(1)).subscribe((bucket: Bucket) => {
      this.cookieService.set('bucket', JSON.stringify(bucket));
    });
  }
}
