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

  constructor(private apiService: ApiService, private cookieService: CookieService) {

  }

  bucket = new BehaviorSubject<Bucket>(this.readBucketFromCookie());
  private readBucketFromCookie(): Bucket {
    const bucketAsString: string = this.cookieService.get('bucket');
    console.log(bucketAsString);
    return bucketAsString ? JSON.parse(bucketAsString) : {};
  }

  addBookToBucket(newBook: Book) {
    this.bucket.pipe(take(1)).subscribe((currBucket: Bucket) => {
      if (currBucket.hasOwnProperty(newBook.id)) {
        this.bucket.next({
          ...currBucket,
          [newBook.id]: {
            ...currBucket[newBook.id], quantity: currBucket[newBook.id].quantity + 1
          }
        });
      } else {
        this.bucket.next({ ...currBucket, [newBook.id]: { book: newBook, quantity: 1 }, });
      }
    });
  }

  removeBookFromBucket(bookId: number) {
    this.bucket.pipe(take(1)).subscribe((currBucket: Bucket) => {
      const newBucket = { ...currBucket };
      delete newBucket[bookId];

      this.bucket.next(newBucket);
    });
  }

  saveBucketAsCookie() {
    this.bucket.pipe(take(1)).subscribe((currBucket: Bucket) => {
      console.log('siema');
      this.cookieService.set('bucket', JSON.stringify(currBucket));
    });
  }
}
