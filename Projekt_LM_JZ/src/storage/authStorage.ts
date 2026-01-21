const KEY = "authUserId";

export function loadAuthUserId(): string | null {
  return localStorage.getItem(KEY);
}

export function saveAuthUserId(userId: string) {
  localStorage.setItem(KEY, userId);
}

export function clearAuthUserId() {
  localStorage.removeItem(KEY);
}
