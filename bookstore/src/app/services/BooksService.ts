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
  pictures = {
    0: '../../assets/got.jpg',
    1: '../../assets/lotr.jpg',
    2: '../../assets/it.jpg',
    3: '../../assets/1.jpg',
    5: '../../assets/2.jpg',
    6: '../../assets/2.jpg',
    7: '../../assets/2.jpg',
    8: '../../assets/2.jpg',
    9: '../../assets/2.jpg',
    10: '../../assets/2.jpg',
  };

  getRecommendedBooks(searchConfig: any) {
    const params = `?page=${1}&pageSize=${10}`;

    this.apiService.execute('books', 'get', {}, params)
      .subscribe(
        (value: RequestResponse<Books>) => {
          console.log(value.successResult.results.map((book: Book, index) => {
            return {...book, pictureName: this.pictures[index] || ''};
          }));
          this.recommendedBooks.next(
            value.successResult.results.map((book: Book, index) => {
              return {...book, pictureName: this.pictures[index] || ''};
            })
          );
        },
        error => {
        }
      );
  }

}
