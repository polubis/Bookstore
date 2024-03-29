import { Account } from 'src/app/models/entities/Account';
import { Book } from 'src/app/models/entities/Book';

export interface OrderStatus {
  id: 'Oczekuje na przyjęcie do realizacji' | 'Przyjęty do realizacji' | 'Zamówienie zrealizowane';
  name: string;
}

export interface AdminOrder {
  id: number;
  totalPrice: number;
  purchasedBooks: Book[];
  status: {
    id: number;
    statusName: string;
  };
  user: Account;
}

export interface AdminOrderTable {
  key: 'id' | 'totalPrice' | 'orderItemsCount' | 'statusName' | 'purchaser';
  name: string;
  sortable?: boolean;
  icon?: string;
}

export interface AdminSlimOrder {
  id: number;
  totalPrice: number;
  orderItemsCount: number;
  statusName: string;
  purchaser: number;
}

