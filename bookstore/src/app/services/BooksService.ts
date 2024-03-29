import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './ApiService';
import { Book, BookQuery, BooksFilterConfig, Books, AddBookPayload, SlimBook } from '../models/entities/Book';
import { RequestResponse } from '../models/others/RequestResponse';
import { DataEnhancer } from '../models/others/DataEnhancer';
import { ServerError } from '../models/others/ServerError';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  recommendedBooks = new BehaviorSubject<DataEnhancer<Book[]>>({ isLoading: true, data: [] });
  newestBooks = new BehaviorSubject<DataEnhancer<Book[]>>({ isLoading: true, data: [] });
  foundBooks = new BehaviorSubject<DataEnhancer<Book[]>>({ isLoading: false, data: [] });

  adminBooks = new BehaviorSubject<SlimBook[]>([]);

  bookDetailsCache = new BehaviorSubject<{ [key: number]: DataEnhancer<Book> }>({});

  constructor(private apiService: ApiService) { }

  prepareBooksPictures(books: Book[]) {
    return books.map(book => {
      return { ...book, pictureName: book.pictureName ? `${environment.bookPicture}${book.pictureName}` : '' };
    });
  }

  changeBooksCache(key: number, isLoading = true, error: ServerError = null, data: Book = null) {
    this.bookDetailsCache.pipe(take(1))
      .subscribe(cache => {
        this.bookDetailsCache.next({ ...cache, [key]: { isLoading, error, data } });
      });
  }

  getRecommendedBooks(numberOfBooks = 15) {
    this.recommendedBooks.next({ isLoading: true, error: null, data: [] });

    this.apiService.execute('books/bestrating', 'get', {}, `?numberOfBooks=${numberOfBooks}`)
      .subscribe(
        ({ successResult: books }: RequestResponse<Book[]>) => {
          this.recommendedBooks.next({
            isLoading: false,
            error: null,
            data: this.prepareBooksPictures(books)
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
        ({ successResult: books }: RequestResponse<Book[]>) => {
          this.newestBooks.next({
            isLoading: false,
            error: null,
            data: this.prepareBooksPictures(books)
          });
        },
        ({ message, code }: ServerError) => {
          this.newestBooks.next({ isLoading: false, error: { message, code }, data: [] });
        }
      );
  }

  findBooks(config: BooksFilterConfig, onSuccess: (books?: any) => void = () => { }, onFailure: () => void = () => { }) {
    this.foundBooks.next({ isLoading: true, error: null, data: [] });
    this.getBooks(config)
      .subscribe(
        ({ successResult }: RequestResponse<Books>) => {
          this.foundBooks.next({
            isLoading: false,
            error: null,
            data: this.prepareBooksPictures(successResult.results)
          });
          onSuccess(successResult);
        },
        ({ message, code }: ServerError) => {
          this.foundBooks.next({ isLoading: false, error: { message, code }, data: [] });
          onFailure();
        }
      );
  }

  getBooks({ page, pageSize, sortOrder, searchAuthor, searchPrinter,
    searchTitle, minPrice, maxPrice, kindOfBookId, printerId }: BooksFilterConfig) {
    const bookQuery = new BookQuery(
      page, pageSize, searchTitle, sortOrder,
      searchAuthor, searchPrinter, minPrice, maxPrice, kindOfBookId,
      printerId
    );
    return this.apiService.execute('books', 'get', {}, bookQuery.query);
  }

  getBook(bookId: number) {
    this.changeBooksCache(bookId);

    this.apiService.execute('books', 'get', {}, `/${bookId}`)
      .subscribe(
        ({ successResult: book }: RequestResponse<Book>) => {
          this.changeBooksCache(bookId, false, null, book);
        },
        error => {
          this.changeBooksCache(bookId, false, error, null);
        }
      );
  }

  createBook({ name, author, price, printer, kindOfBookName, description, pictureBook }: AddBookPayload) {
    const book = new FormData();
    book.set('name', name);
    book.set('author', author);
    book.set('price', price + '');
    book.set('printer', printer);
    book.set('kindOfBookName', kindOfBookName);
    book.set('description', description);
    book.set('pictureBook', pictureBook);

    return this.apiService.execute('books/add', 'post', book, '');
  }

  deleteBook(bookId: number) {
    return this.apiService.execute('books', 'delete', {}, `/${bookId}`).pipe();
  }

  editBook(bookId: number, { name, author, price, printer, kindOfBookName, description, pictureBook }: AddBookPayload) {
    const newBook = new FormData();
    newBook.set('name', name);
    newBook.set('author', author);
    newBook.set('price', price + '');
    newBook.set('printer', printer);
    newBook.set('kindOfBookName', kindOfBookName);
    newBook.set('description', description);
    if (typeof pictureBook !== 'string') {
      newBook.set('pictureBook', pictureBook);
    }

    return this.apiService.execute('books', 'patch', newBook, `/${bookId}`);
  }

  removeBookFromCache(bookId: number) {
    this.bookDetailsCache.pipe(take(1))
      .subscribe(cache => {
        const copiedCache = { ...cache };
        delete copiedCache[bookId];
        this.bookDetailsCache.next(copiedCache);
      });
  }
}
