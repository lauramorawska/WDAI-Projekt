import { createContext } from "react";
import type { User } from "../types/User";

export type AuthValue = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthValue | null>(null);
