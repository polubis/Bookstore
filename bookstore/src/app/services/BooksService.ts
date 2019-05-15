import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { Book, BookQuery, BooksFilterConfig, Books } from '../models/entities/Book';
import { RequestResponse } from '../models/others/RequestResponse';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { ServerError } from '../models/others/ServerError';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  recommendedBooks = new BehaviorSubject<DataEnhancer<Book[]>>({ isLoading: true, data: [] });
  newestBooks = new BehaviorSubject<DataEnhancer<Book[]>>({ isLoading: true, data: [] });
  foundBooks = new BehaviorSubject<DataEnhancer<Book[]>>({ isLoading: false, data: [] });

  constructor(private apiService: ApiService) { }
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
          this.recommendedBooks.next({
            isLoading: false,
            error: null,
            data: value.successResult.map((book: Book, index) => {
              return { ...book, pictureName: this.pictures[index] || '' };
            })
          });
        },
        ({ message, code }: ServerError) => {
          this.recommendedBooks.next({ isLoading: false, error: { message, code }, data: [] });
        }
      );
  }

  getNewestBooks(numberOfBooks = 15) {
    this.newestBooks.next({ isLoading: true, error: null, data: [] });

    this.apiService.execute('books/newest', 'get', {}, `?numberOfBooks=${numberOfBooks}`)
      .subscribe(
        (value: RequestResponse<Book[]>) => {
          this.newestBooks.next({
            isLoading: false,
            error: null,
            data: value.successResult.map((book: Book, index) => {
              return { ...book, pictureName: this.pictures[index] || '' };
            })
          });
        },
        ({ message, code }: ServerError) => {
          this.newestBooks.next({ isLoading: false, error: { message, code }, data: [] });
        }
      );
  }

  findBooks(config: BooksFilterConfig, onSuccess: () => void = () => {}, onFailure: () => void = () => {}) {
    this.foundBooks.next({ isLoading: true, error: null, data: [] });
    this.getBooks(config)
      .subscribe(
        ({ successResult }: RequestResponse<Books>) => {
          this.foundBooks.next({
            isLoading: false,
            error: null,
            data: successResult.results.map((book: Book, index) => {
              return { ...book, pictureName: this.pictures[index] || '' };
            })
          });
          onSuccess();
        },
        ({ message, code }: ServerError) => {
          this.foundBooks.next({ isLoading: false, error: { message, code }, data: [] });
          onFailure();
        }
      );
  }

  getBooks({ page, pageSize, sortOrder, searchAuthor, searchPrinter, searchTitle, printerId }: BooksFilterConfig) {
    const bookQuery = new BookQuery(page, pageSize, searchTitle, sortOrder, searchAuthor, searchPrinter, printerId);
    return this.apiService.execute('books', 'get', {}, bookQuery.query);
  }
}
