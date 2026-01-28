export type Review = {
  id: string;
  productId: number;
  userId: string;
  authorEmail: string;
  rating: number; // 1-5
  text: string;
  createdAt: string;
  updatedAt?: string;
};
