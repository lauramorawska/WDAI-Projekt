import { useMemo } from "react";
import { loadOrdersByUserId } from "../storage/ordersStorage";
import { Link } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function OrdersPage() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const orders = useMemo(() => loadOrdersByUserId(user.id), [user.id]);

  if (orders.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Orders</h1>
        <p>No orders yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Orders</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {orders.map((o) => (
          <div
            key={o.id}
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
          >
            <div>
              <b>Order #{o.id}</b>
            </div>
            <div>Date: {new Date(o.createdAt).toLocaleString()}</div>
            <div>Items: {o.items.length}</div>
            <div>Total: {o.totalPrice.toFixed(2)} zł</div>

            <Link to={`/orders/${o.id}`}>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
