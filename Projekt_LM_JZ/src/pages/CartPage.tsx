import { useCart } from "../context/useCart";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    setQuantity,
    clearCart,
    checkout,
    totalPrice,
  } = useCart();

  if (items.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h1>🛒 Shopping Cart</h1>
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "var(--text-secondary)",
          }}
        >
          <p style={{ fontSize: "1.1rem" }}>Your cart is empty</p>
          <p>Start shopping to add items to your cart!</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <h1>🛒 Shopping Cart</h1>

      <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
        {items.map((x) => (
          <div
            key={x.product.id}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              padding: "1.5rem",
              display: "grid",
              gridTemplateColumns: "100px 1fr 150px 120px",
              gap: "1.5rem",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(167, 139, 250, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <img
              src={x.product.image}
              alt={x.product.title}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />

            <div>
              <b style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>
                {x.product.title}
              </b>
              <div
                style={{
                  color: "#c4b5fd",
                  fontWeight: "600",
                  marginTop: "0.5rem",
                }}
              >
                {x.product.price.toFixed(2)} zł
              </div>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: "600",
              }}
            >
              Qty:
              <input
                type="number"
                min={1}
                value={x.quantity}
                onChange={(e) =>
                  setQuantity(x.product.id, Number(e.target.value))
                }
                style={{
                  width: "60px",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "2px solid var(--border-color)",
                  textAlign: "center",
                }}
              />
            </label>

            <button
              onClick={() => removeFromCart(x.product.id)}
              style={{
                background: "var(--danger-color)",
                color: "white",
                border: "none",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "var(--bg-card)",
          padding: "2rem",
          borderRadius: "12px",
          border: "2px solid var(--border-color)",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--text-primary)",
            marginBottom: "1rem",
          }}
        >
          Order Summary
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1rem",
            borderTop: "2px solid var(--border-color)",
          }}
        >
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "var(--text-secondary)",
            }}
          >
            Total:
          </span>
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#c4b5fd",
            }}
          >
            {totalPrice.toFixed(2)} zł
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button
          onClick={clearCart}
          style={{
            background: "var(--bg-card)",
            color: "#c4b5fd",
            border: "2px solid #a78bfa",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#a78bfa";
            e.currentTarget.style.color = "#1a1a2e";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-card)";
            e.currentTarget.style.color = "#c4b5fd";
          }}
        >
          Clear Cart
        </button>
        <button
          onClick={checkout}
          style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)",
            color: "#1a1a2e",
            border: "none",
            padding: "0.75rem 2rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1.1rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(167, 139, 250, 0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 16px rgba(167, 139, 250, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(167, 139, 250, 0.4)";
          }}
        >
          ✓ Checkout
        </button>
      </div>
    </div>
  );
}
