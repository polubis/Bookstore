import { Book } from './Book';

export interface Bucket {
  [key: string]: {
    quantity: number;
    book: Book;
  };
}
