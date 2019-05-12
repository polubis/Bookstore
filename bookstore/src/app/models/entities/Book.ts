export class Book {
  constructor(
    public name: string,
    public author: string,
    public printer: string,
    public kindOfBookName: string,
    public price: number,
    public description: string,
    public pictureName: string,
    public id: string,
  ) {
  }
}

export interface Books {
  currentPage: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
  pageCount: number;
  pageSize: number;
  results: Book[];
  rowCount: number;
}

export interface BooksFilterConfig {
  page?: number;
  pageSize?: number;
  searchTitle?: string;
  sortOrder?: string;
  searchPrinter?: string;
  searchAuthor?: string;
  printerId?: number;
}

export class BookQuery implements BooksFilterConfig {
  query = '';

  constructor(
    public page = 1,
    public pageSize = 15,
    public searchTitle = '',
    public sortOrder = 'asc',
    public searchPrinter = '',
    public searchAuthor = '',
    public printerId?: number
  ) {

    this.query = `?page=${page}&pageSize=${pageSize}&searchTitle=${searchTitle}&sortOrder=${sortOrder}`;
  }
}
