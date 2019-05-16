
export interface Book {
  name: string;
  author: {
    id: number;
    name: string;
  };
  printer: {
    id: number;
    name: string;
  };
  kindOfBook: {
    id: number;
    name: string;
  };
  price: number;
  description: string;
  pictureName: string;
  id: string;
  averageOfRatings: number;
}

export interface SlimBook {
  name: string;
  author: string;
  printer: string;
  kindOfBookName: string;
  price: number;
  description: string;
  pictureName: string;
  id: string;
  averageOfRatings: number;
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
  minPrice?: number;
  maxPrice?: number;
}

export class BookQuery implements BooksFilterConfig {
  query = '';

  constructor(
    public page = 1,
    public pageSize = 15,
    public searchTitle = '',
    public sortOrder = 'name_asc',
    public searchAuthor = '',
    public searchPrinter = '',
    public minPrice,
    public maxPrice
  ) {

    this.query = `?page=${page}&pageSize=${pageSize}&searchTitle=${searchTitle}&searchPrinter=${
      searchPrinter}&searchAuthor=${searchAuthor}&sortOrder=${sortOrder}`;
  }
}

export type BooksFilterKeys = 'page' | 'pageSize' | 'searchTitle' |
'sortOrder' | 'searchAuthor' | 'searchPrinter' | 'minPrice' | 'maxPrice';

