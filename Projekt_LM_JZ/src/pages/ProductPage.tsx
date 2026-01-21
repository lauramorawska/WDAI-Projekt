import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productsApi";
import type { Product } from "../types/Product";
import { useCart } from "../context/useCart";

export default function ProductPage() {
  const { id } = useParams(); // id z URL np. /product/5
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState("1");
  const [message, setMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // zabezpieczenie: gdy id jest złe
    if (!id || Number.isNaN(productId)) {
      setError("Invalid product id");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, productId]);

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;
  if (error) return <p style={{ padding: 16, color: "red" }}>{error}</p>;
  if (!product) return <p style={{ padding: 16 }}>No product</p>;

  return (
    <div
      style={{
        padding: 16,
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        gap: 24,
      }}
    >
      <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: 280, objectFit: "contain" }}
        />
      </div>

      <div>
        <h1 style={{ marginTop: 0 }}>{product.title}</h1>
        <p style={{ maxWidth: 700 }}>{product.description}</p>
        <p>
          <b>Price:</b> {product.price.toFixed(2)} zł
        </p>

        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <label>
            Quantity:
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              style={{ marginLeft: 8, width: 90, padding: 6 }}
            />
          </label>

          <button
            onClick={() => {
              const quantity = Number(qty);
              if (isNaN(quantity) || quantity <= 0) {
                setMessage("Quantity must be a number greater than 0");
                return;
              }
              addToCart(product, quantity);
              setMessage("Added to cart!");
              window.setTimeout(() => setMessage(null), 2000);
            }}
          >
            Add to cart
          </button>
        </div>
        {message && (
          <p
            style={{
              marginTop: 12,
              color: message.includes("must") ? "red" : "lightgreen",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
