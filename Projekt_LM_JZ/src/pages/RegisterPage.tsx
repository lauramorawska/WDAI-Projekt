import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../types/User";
import { addUser } from "../storage/usersStorage";

export default function RegisterPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleRegister() {
    setError(null);

    const e = email.trim();
    if (!e.includes("@")) {
      setError("Invalid email");
      return;
    }
    if (password.length < 4) {
      setError("Password must have at least 4 characters");
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: e,
      password,
      role: "user",
    };

    const ok = addUser(newUser);
    if (!ok) {
      setError("User with this email already exists");
      return;
    }

    nav("/login");
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
          👋 Create Account
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            marginBottom: "2rem",
          }}
        >
          Join ShopHub and start shopping
        </p>

        <div style={{ display: "grid", gap: "1.5rem" }}>
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
                boxSizing: "border-box",
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
                boxSizing: "border-box",
              }}
            />
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                marginTop: "0.5rem",
              }}
            >
              At least 4 characters
            </p>
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
            onClick={handleRegister}
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
            Create Account
          </button>
        </div>

        <hr
          style={{
            margin: "2rem 0",
            border: "none",
            borderTop: "1px solid var(--border-color)",
          }}
        />

        <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--primary-color)",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
