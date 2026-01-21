import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productsApi";
import type { Product } from "../types/Product";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import type { Review } from "../types/Review";
import {
  addReview,
  deleteReview,
  getReviewsByProduct,
  updateReview,
} from "../storage/reviewsStorage";

export default function ProductPage() {
  const { id } = useParams(); // id z URL np. /product/5
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState("1");
  const [message, setMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState("5");
  const [text, setText] = useState("");
  const [reviewError, setReviewError] = useState<string | null>(null);

  // do edycji:
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState("5");
  const [editText, setEditText] = useState("");

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

  useEffect(() => {
    if (!product) return;
    setReviews(getReviewsByProduct(product.id));
  }, [product]);

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
              if (!user) {
                nav("/login", {
                  replace: true,
                  state: { from: location.pathname },
                });
                return;
              }

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
        <hr style={{ margin: "24px 0" }} />

        <h2>Reviews</h2>

        {!user && (
          <p style={{ opacity: 0.8 }}>Login required to add a review.</p>
        )}

        {user && (
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <h3 style={{ marginTop: 0 }}>Add review</h3>

            <label>
              Rating (1-5):
              <input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ marginLeft: 8, width: 80, padding: 6 }}
              />
            </label>

            <div style={{ marginTop: 12 }}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your opinion..."
                style={{ width: "100%", minHeight: 80, padding: 8 }}
              />
            </div>

            {reviewError && <p style={{ color: "red" }}>{reviewError}</p>}

            <button
              onClick={() => {
                setReviewError(null);

                const r = Number(rating);
                if (!Number.isFinite(r) || r < 1 || r > 5) {
                  setReviewError("Rating must be between 1 and 5");
                  return;
                }
                if (text.trim().length < 3) {
                  setReviewError("Review text is too short");
                  return;
                }

                const newReview: Review = {
                  id: crypto.randomUUID(),
                  productId: product.id,
                  authorEmail: user.email,
                  rating: r,
                  text: text.trim(),
                  createdAt: new Date().toISOString(),
                };

                addReview(newReview);
                setReviews(getReviewsByProduct(product.id));
                setText("");
                setRating("5");
              }}
            >
              Add review
            </button>
          </div>
        )}

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {reviews.map((rev) => {
              const isOwner = user?.email === rev.authorEmail;

              return (
                <div
                  key={rev.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div>
                      <b>{rev.authorEmail}</b> — {rev.rating}/5
                      <div style={{ fontSize: 12, opacity: 0.7 }}>
                        {new Date(rev.createdAt).toLocaleString()}
                        {rev.updatedAt
                          ? ` (edited ${new Date(rev.updatedAt).toLocaleString()})`
                          : ""}
                      </div>
                    </div>

                    {isOwner && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => {
                            setEditingId(rev.id);
                            setEditRating(String(rev.rating));
                            setEditText(rev.text);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteReview(rev.id);
                            setReviews(getReviewsByProduct(product.id));
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {editingId === rev.id ? (
                    <div style={{ marginTop: 12 }}>
                      <label>
                        Rating:
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={editRating}
                          onChange={(e) => setEditRating(e.target.value)}
                          style={{ marginLeft: 8, width: 80, padding: 6 }}
                        />
                      </label>

                      <div style={{ marginTop: 12 }}>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          style={{ width: "100%", minHeight: 80, padding: 8 }}
                        />
                      </div>

                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button
                          onClick={() => {
                            const r = Number(editRating);
                            if (!Number.isFinite(r) || r < 1 || r > 5) return;

                            updateReview(rev.id, {
                              rating: r,
                              text: editText.trim(),
                            });
                            setReviews(getReviewsByProduct(product.id));
                            setEditingId(null);
                          }}
                        >
                          Save
                        </button>
                        <button onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p style={{ marginTop: 12 }}>{rev.text}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
