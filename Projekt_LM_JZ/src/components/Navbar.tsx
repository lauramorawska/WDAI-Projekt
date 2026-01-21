import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/login">Login</Link>

      {/* przykład linku do produktu */}
      <Link to="/product/1">Product #1</Link>
      {user ? (
        <>
          <span style={{ marginLeft: 12 }}>Logged: {user.email}</span>
          <button onClick={logout} style={{ marginLeft: 12 }}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" style={{ marginLeft: 12 }}>
          Login
        </Link>
      )}
    </nav>
  );
}
