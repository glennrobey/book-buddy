import { useState } from "react";

// Links API base URL
const API = import.meta.env.VITE_API;

export default function Register() {
  // Local state: form fields, error message, and loading state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles form submission and registration request
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Sends registration info to API
      const res = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      // Throws error if response is not successful
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Success message
      alert("Registration successful! Please log in.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      // Handles and displays any errors
      setError(err.message);
    } finally {
      // Always disables loading after request completes
      setLoading(false);
    }
  }

  // Renders the registration form
  return (
    <article>
      <h1>Register</h1>

      {/* Error display */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </article>
  );
}
