import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { Book } from '../models/entities/Book';
import { take } from 'rxjs/operators';
import { Bucket } from '../models/entities/Bucket';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  bucket = new BehaviorSubject<Bucket>({});

  constructor(private apiService: ApiService) {

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
}
