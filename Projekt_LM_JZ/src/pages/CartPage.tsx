import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, setQuantity, clearCart, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Cart</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((x) => (
          <div
            key={x.product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              display: "grid",
              gridTemplateColumns: "90px 1fr 140px 120px",
              gap: 12,
              alignItems: "center",
            }}
          >
            <img
              src={x.product.image}
              alt={x.product.title}
              style={{ width: 70, height: 70, objectFit: "contain" }}
            />

            <div>
              <b>{x.product.title}</b>
              <div>{x.product.price.toFixed(2)} zł</div>
            </div>

            <label>
              Qty:
              <input
                type="number"
                min={1}
                value={x.quantity}
                onChange={(e) =>
                  setQuantity(x.product.id, Number(e.target.value))
                }
                style={{ marginLeft: 8, width: 80, padding: 6 }}
              />
            </label>

            <button onClick={() => removeFromCart(x.product.id)}>Remove</button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "16px 0" }} />

      <p>
        <b>Total:</b> {totalPrice.toFixed(2)} zł
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={clearCart}>Clear cart</button>
        <button onClick={() => alert("Checkout (na razie test)")}>
          Checkout
        </button>
      </div>
    </div>
  );
}
