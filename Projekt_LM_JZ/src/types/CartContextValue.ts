import type { CartItem } from "./CartItem";
import type { Product } from "./Product";

export type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  checkout: () => void;
  clearCart: () => void;
  totalPrice: number;
};
