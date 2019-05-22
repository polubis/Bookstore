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
  key: 'id' | 'author' | 'averageOfRatings' | 'kindOfBookName' | 'name' | 'price' | 'printer';
  name: string;
  sortable?: boolean;
  icon?: string;
}

export interface OrderStatus {
  id: 1 | 2 | 3;
  statusName: 'Oczekuje na przyjęcie do realizacji' | 'Przyjęty do realizacji' | 'Zamówienie zrealizowane';
}
