import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";
import { loadCart, saveCart } from "../storage/cartStorage";

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  // zapis do localStorage po każdej zmianie koszyka
  useEffect(() => {
    saveCart(items);
  }, [items]);

  function addToCart(product: Product, quantity: number) {
    const qty = Math.max(1, Math.floor(quantity || 1));

    setItems((prev) => {
      const idx = prev.findIndex((x) => x.product.id === product.id);
      if (idx === -1) {
        return [...prev, { product, quantity: qty }];
      }
      const copy = [...prev];
      copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
      return copy;
    });
  }

  function removeFromCart(productId: number) {
    setItems((prev) => prev.filter((x) => x.product.id !== productId));
  }

  function setQuantity(productId: number, quantity: number) {
    const qty = Math.max(1, Math.floor(quantity || 1));
    setItems((prev) =>
      prev.map((x) =>
        x.product.id === productId ? { ...x, quantity: qty } : x,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalPrice = useMemo(() => {
    return items.reduce((sum, x) => sum + x.product.price * x.quantity, 0);
  }, [items]);

  const value: CartContextValue = {
    items,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
