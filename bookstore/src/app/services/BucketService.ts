import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { Book } from '../models/entities/Book';
import { take } from 'rxjs/operators';
import { Bucket } from '../models/entities/Bucket';
import { CookieService } from 'ngx-cookie-service';

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

  addBookToBucket(newBook: Book) {
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

  removeBookFromBucket(bookId: number) {
    this.bucket.pipe(take(1)).subscribe(({ size, cost, items }: Bucket) => {
      const newBucket = { size: --size, cost: cost - 20, items: { ...items } };
      delete newBucket.items[bookId];

      this.bucket.next(newBucket);
    });
  }

  saveBucketAsCookie() {
    this.bucket.pipe(take(1)).subscribe((bucket: Bucket) => {
      this.cookieService.set('bucket', JSON.stringify(bucket));
    });
  }
}
