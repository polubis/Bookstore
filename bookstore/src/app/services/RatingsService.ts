import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private apiService: ApiService) {

  }

  getRatings(bookId: number) {
    return this.apiService.execute('ratings', 'get', {}, `/${bookId}`);
  }

  addRating(bookId: number, rate: { value: number, description: string }) {
    return this.apiService.execute('ratings/add', 'post', rate, `?bookId=${bookId}`);
  }

  deleteRating(ratingId: number) {
    return this.apiService.execute('ratings', 'delete', {}, `/${ratingId}`);
  }

}
