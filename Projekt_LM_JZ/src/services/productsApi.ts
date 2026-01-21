import type { Product } from "../types/Product";

const BASE_URL = "https://fakestoreapi.com";

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Unable to fetch products");
  return res.json();
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Unable to fetch product");
  return res.json();
}
