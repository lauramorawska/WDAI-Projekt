import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)",
        display: "flex",
        gap: "1.5rem",
        padding: "1rem 2rem",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#f3f4f6",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        borderBottom: "2px solid #a78bfa",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#c4b5fd",
            textDecoration: "none",
          }}
        >
          🛍️ ShopHub
        </Link>

        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              color: "#f3f4f6",
              textDecoration: "none",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#f3f4f6")}
          >
            Home
          </Link>

          <Link
            to="/cart"
            style={{
              color: "#f3f4f6",
              textDecoration: "none",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#f3f4f6")}
          >
            🛒 Cart
          </Link>

          <Link
            to="/orders"
            style={{
              color: "#f3f4f6",
              textDecoration: "none",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#f3f4f6")}
          >
            📦 Orders
          </Link>
        </div>
      </div>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {user ? (
          <>
            <span
              style={{
                color: "#f3f4f6",
                fontWeight: "500",
              }}
            >
              👤 {user.email}
            </span>
            <button
              onClick={logout}
              style={{
                background: "rgba(167, 139, 250, 0.2)",
                color: "#c4b5fd",
                border: "2px solid #a78bfa",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#a78bfa";
                e.currentTarget.style.color = "#1a1a2e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(167, 139, 250, 0.2)";
                e.currentTarget.style.color = "#c4b5fd";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "#f3f4f6",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#f3f4f6")}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                background: "rgba(167, 139, 250, 0.2)",
                color: "#c4b5fd",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all 0.3s ease",
                border: "2px solid #a78bfa",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#a78bfa";
                e.currentTarget.style.color = "#1a1a2e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(167, 139, 250, 0.2)";
                e.currentTarget.style.color = "#c4b5fd";
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
