import type { User } from "../types/User";

const KEY = "users";

export function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]) {
  localStorage.setItem(KEY, JSON.stringify(users));
}

export function addUser(user: User): boolean {
  const users = loadUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === user.email.toLowerCase(),
  );
  if (exists) return false;
  saveUsers([user, ...users]);
  return true;
}
