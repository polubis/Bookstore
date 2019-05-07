import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { Book } from '../models/entities/Book';
import { RequestResponse } from '../models/others/RequestResponse';
import { DataEnhancer } from '../models/others/DataEnhancer';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  recommendedBooks = new BehaviorSubject<DataEnhancer<Book[]>>({ isLoading: true, data: [] });

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

  getRecommendedBooks(numberOfBooks = 15) {
    this.recommendedBooks.next({ isLoading: true, error: null, data: [] });

    this.apiService.execute('books/bestrating', 'get', {}, `?numberOfBooks=${numberOfBooks}`)
      .subscribe(
        (value: RequestResponse<Book[]>) => {
          console.log(value.successResult);
          this.recommendedBooks.next({
            isLoading: false,
            error: null,
            data: value.successResult.map((book: Book, index) => {
              return { ...book, pictureName: this.pictures[index] || '' };
            })
          });
        },
        ({message, code}) => {
          this.recommendedBooks.next({ isLoading: false, error: { message, code }, data: []});
        }
      );
  }

}
