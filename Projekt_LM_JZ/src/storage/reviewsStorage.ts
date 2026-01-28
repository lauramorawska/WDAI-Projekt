import type { Review } from "../types/Review";

const KEY = "reviews";

function loadAll(): Review[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Review[];
  } catch {
    return [];
  }
}

function saveAll(reviews: Review[]) {
  localStorage.setItem(KEY, JSON.stringify(reviews));
}

export function getReviewsByProduct(productId: number): Review[] {
  return loadAll().filter((r) => r.productId === productId);
}

export function getUserReviewForProduct(
  userId: string,
  productId: number,
): Review | null {
  const all = loadAll();
  return (
    all.find((r) => r.userId === userId && r.productId === productId) || null
  );
}

export function addReview(review: Review) {
  const all = loadAll();
  saveAll([review, ...all]);
}

export function deleteReview(reviewId: string) {
  const all = loadAll();
  saveAll(all.filter((r) => r.id !== reviewId));
}

export function updateReview(
  reviewId: string,
  patch: { rating?: number; text?: string },
) {
  const all = loadAll();
  const updated = all.map((r) =>
    r.id === reviewId
      ? {
          ...r,
          rating: patch.rating ?? r.rating,
          text: patch.text ?? r.text,
          updatedAt: new Date().toISOString(),
        }
      : r,
  );
  saveAll(updated);
}
