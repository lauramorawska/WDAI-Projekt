import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: 120, height: 120, objectFit: "contain" }}
      />

      <h3 style={{ margin: "8px 0" }}>{product.title}</h3>

      <p style={{ margin: "8px 0" }}>{product.description.slice(0, 80)}...</p>

      <p>
        <b>{product.price.toFixed(2)} zł</b>
      </p>

      <Link to={`/product/${product.id}`}>See product</Link>
    </div>
  );
}
