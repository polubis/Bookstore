import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { Book, Books } from '../models/entities/Book';
import { RequestResponse } from '../models/others/RequestResponse';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  recommendedBooks = new BehaviorSubject<Book[]>([]);

  constructor(private apiService: ApiService) {

  }

  getBooksRecommendedBooks(searchConfig: any) {
    const params = `?page=${1}&pageSize=${10}`;

    this.apiService.execute('books', 'get', {}, params)
      .subscribe(
        (value: RequestResponse<Books>) => {
          this.recommendedBooks.next(value.successResult.results);
        },
        error => {
        }
      );
  }

}
