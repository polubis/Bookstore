import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { RequestResponse } from '../models/others/RequestResponse';
import { OrderStatus } from '../pages/admin/pages/orders/models';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private apiService: ApiService) {

  }

  getRatings(bookId: number) {
    return this.apiService.execute('ratings', 'get', {}, `/${bookId}`);
  }

  addRating() {
    return this.apiService.execute('ratings/add', 'post', {});
  }

  deleteRating(ratingId: number) {
    return this.apiService.execute('ratings', 'delete', {}, `/${ratingId}`);
  }

}
