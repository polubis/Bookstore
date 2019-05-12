import { Book } from './Book';

export type OrderItem = Book & { quantity: number };
