export type Review = {
  id: string;
  productId: number;
  authorEmail: string;
  rating: number; // 1-5
  text: string;
  createdAt: string;
  updatedAt?: string;
};
