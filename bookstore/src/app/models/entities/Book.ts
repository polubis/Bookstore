
export class Book {
  name: string;
  author: {
    id: number;
    name: string;
  };
  printer?: {
    id: number;
    name: string;
  };
  kindOfBook?: {
    id: number;
    name: string;
  };
  price: number;
  description: string;
  pictureName: string;
  id: string;
  averageOfRatings: number;
  ratings?: any[];
}

export interface BookDetails {
  id: number;
  author: string;
  averageOfRatings: number;
  description: string;
  name: string;
  price: number;
  pictureName?: string;
  kindOfBook?: { id: number, name: string };
  printer?: { id: number, name: string };
  ratings: any[];
}

export interface SlimBook {
  name: string;
  author: string;
  printer: string;
  kindOfBookName: string;
  price: number;
  description: string;
  pictureName: string | File;
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
  printerId?: number;
  searchTitle?: string;
  sortOrder?: string;
  searchPrinter?: string;
  searchAuthor?: string;
  minPrice?: number;
  maxPrice?: number;
  kindOfBookId?: number;
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
    public maxPrice,
    public kindOfBookId,
    public printerId
  ) {
    let query = `?page=${page}&pageSize=${pageSize}&searchTitle=${searchTitle}&searchPrinter=${
      searchPrinter}&searchAuthor=${searchAuthor}&sortOrder=${sortOrder}`;

    if (minPrice) {
      query += `&minPrice=${minPrice}`;
    }

    if (maxPrice) {
      query += `&maxPrice=${maxPrice}`;
    }

    if (kindOfBookId) {
      query += `&kindOfBookId=${kindOfBookId}`;
    }

    if (printerId) {
      query += `&printerId=${printerId}`;
    }

    this.query = query;
  }
}

export type BooksFilterKeys = 'page' | 'pageSize' | 'searchTitle' |
  'sortOrder' | 'searchAuthor' | 'searchPrinter' | 'minPrice' | 'maxPrice' | 'printerId';

export interface AddBookPayload {
  name: string;
  author: string;
  printer: string;
  kindOfBookName: string;
  price: number | string;
  description: string;
  pictureBook: File | string;
}
