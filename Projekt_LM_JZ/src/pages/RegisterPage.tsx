import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import { addUser } from "../storage/usersStorage";

export default function RegisterPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h1>Create account</h1>

      <label>
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 6, marginBottom: 12 }}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 6, marginBottom: 12 }}
        />
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={() => {
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
        }}
      >
        Create
      </button>
    </div>
  );
}
