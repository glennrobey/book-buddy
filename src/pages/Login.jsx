import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Links API base URL
const API = import.meta.env.VITE_API;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Local state: form fields, error message, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles form submission and login request
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Sends login credentials to API
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // Throws error if response is not successful
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Logs in the user and redirects to their account page
      login(data.user, data.token);
      navigate("/account"); // <-- redirect to account after login
    } catch (err) {
      // Handles and displays any errors
      setError(err.message);
    } finally {
      // Always disables loading after request completes
      setLoading(false);
    }
  }

  // Renders the login form
  return (
    <article>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Email field */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </label>

        {/* Password field */}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>

        {/* Submit button with loading text */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Error display */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </article>
  );
}
