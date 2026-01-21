import { useMemo, useState } from "react";
import type { User } from "../types/User";
import { usersMock } from "../data/usersMock";
import {
  clearAuthUserId,
  loadAuthUserId,
  saveAuthUserId,
} from "../storage/authStorage";
import { AuthContext } from "./AuthContext";
import { loadUsers } from "../storage/usersStorage";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(() => loadAuthUserId());

  const user = useMemo<User | null>(() => {
    if (!userId) return null;
    return usersMock.find((u) => u.id === userId) ?? null;
  }, [userId]);

  function login(email: string, password: string) {
    const allUsers = [...usersMock, ...loadUsers()];
    const found = allUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) return false;
    setUserId(found.id);
    saveAuthUserId(found.id);
    return true;
  }

  function logout() {
    setUserId(null);
    clearAuthUserId();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
