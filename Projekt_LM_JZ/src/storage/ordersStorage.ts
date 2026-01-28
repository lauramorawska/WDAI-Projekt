import type { Order } from "../types/Order";

const KEY = "orders";

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export function loadOrdersByUserId(userId: string): Order[] {
  const all = loadOrders();
  return all.filter((o) => o.userId === userId);
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(KEY, JSON.stringify(orders));
}
