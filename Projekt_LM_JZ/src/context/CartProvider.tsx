import { useEffect, useMemo, useState } from "react";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";
import { loadCart, saveCart } from "../storage/cartStorage";
import type { Order } from "../types/Order";
import { loadOrders, saveOrders } from "../storage/ordersStorage";
import { CartContext } from "./CartContext";
import type { CartContextValue } from "../types/CartContextValue";

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

  function checkout() {
    if (items.length === 0) return;

    const now = new Date();
    const newOrder: Order = {
      id: crypto.randomUUID(),
      createdAt: now.toISOString(),
      items: items.map((x) => ({
        product: x.product,
        quantity: x.quantity,
        unitPrice: x.product.price,
      })),
      totalPrice: totalPrice,
    };

    const prevOrders = loadOrders();
    const updated = [newOrder, ...prevOrders];
    saveOrders(updated);

    clearCart();
  }

  const value: CartContextValue = {
    items,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    checkout,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
