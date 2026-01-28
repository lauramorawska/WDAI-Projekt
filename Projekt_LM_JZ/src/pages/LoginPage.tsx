import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // jeśli przyszliśmy tu z protected route, to przekieruj po loginie tam
  const from = (location.state as { from?: string } | null)?.from ?? "/orders";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const ok = login(email.trim(), password);
    if (!ok) {
      setError("Invalid email or password");
      return;
    }

    nav(from, { replace: true });
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 80px)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(99, 102, 241, 0.2)",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid var(--border-color)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          🔐 Sign In
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            marginBottom: "2rem",
          }}
        >
          Welcome back to ShopHub
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "1.5rem" }}
        >
          <div>
            <label
              style={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid var(--border-color)",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid var(--border-color)",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                color: "var(--danger-color)",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              background: "var(--gradient)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(99, 102, 241, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(99, 102, 241, 0.3)";
            }}
          >
            Sign In
          </button>
        </form>

        <hr
          style={{
            margin: "2rem 0",
            border: "none",
            borderTop: "1px solid var(--border-color)",
          }}
        />

        <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "var(--primary-color)",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
