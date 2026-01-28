import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { loadOrdersByUserId } from "../storage/ordersStorage";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const order = useMemo(() => {
    const userOrders = loadOrdersByUserId(user.id);
    return userOrders.find((o) => o.id === id) || null;
  }, [id, user.id]);

  if (!order) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Order details</h1>
        <p>Order not found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Order #{order.id}</h1>
      <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

      <div style={{ display: "grid", gap: 12 }}>
        {order.items.map((x) => (
          <div
            key={x.product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              display: "grid",
              gridTemplateColumns: "80px 1fr 120px 120px",
              gap: 12,
              alignItems: "center",
            }}
          >
            <img
              src={x.product.image}
              alt={x.product.title}
              style={{ width: 60, height: 60, objectFit: "contain" }}
            />
            <div>
              <b>{x.product.title}</b>
            </div>
            <div>Qty: {x.quantity}</div>
            <div>{(x.unitPrice * x.quantity).toFixed(2)} zł</div>
          </div>
        ))}
      </div>

      <hr style={{ margin: "16px 0" }} />
      <p>
        <b>Total:</b> {order.totalPrice.toFixed(2)} zł
      </p>
    </div>
  );
}
