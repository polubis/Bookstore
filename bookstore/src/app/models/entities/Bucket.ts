import { Book } from './Book';

export interface Bucket {
  size: number;
  cost: number;
  items: {
    [key: string]: {
      quantity: number;
      book: Book;
    }
  };
}
