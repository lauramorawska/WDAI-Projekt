import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

        <button type="submit" style={{ padding: "8px 12px" }}>
          Sign in
        </button>
      </form>
    </div>
  );
}
