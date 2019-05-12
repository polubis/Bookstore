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
