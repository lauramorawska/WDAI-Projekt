import type { Product } from "./Product";

export type OrderItem = {
  product: Product;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  createdAt: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
};
