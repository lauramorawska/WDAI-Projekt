import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "../services/productsApi";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        setProducts(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div
      style={{
        padding: "2rem",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>🛍️ Our Products</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
          Discover our amazing collection
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Search products..."
          style={{
            padding: "0.75rem 1rem",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "8px",
            border: "2px solid var(--border-color)",
            fontSize: "1rem",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--primary-color)";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(99, 102, 241, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>
            ⏳ Loading products...
          </p>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "1rem",
            background: "rgba(239, 68, 68, 0.1)",
            borderRadius: "8px",
            color: "var(--danger-color)",
          }}
        >
          ❌ {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>
            No products found
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
