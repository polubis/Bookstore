import { Book } from './Book';

export type OrderItem = Book & { quantity: number };

export interface Order {
  id: number;
  purchasedBooks: Book[];
  status: {
    id: number;
    statusName: string;
  };
  totalPrice: 62;
}

export interface BooksTable {
  key: 'id' | 'author' | 'averageOfRatings' | 'kindOfBook' | 'name' | 'price' | 'printer';
  name: string;
  sortable?: boolean;
  icon?: string;
}

