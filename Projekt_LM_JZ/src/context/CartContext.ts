import { createContext } from "react";
import type { CartContextValue } from "../types/CartContextValue";

export { type CartContextValue } from "../types/CartContextValue";

export const CartContext = createContext<CartContextValue | null>(null);
