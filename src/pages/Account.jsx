import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Links API
const API = import.meta.env.VITE_API;

export default function Account() {
  const { user, token, logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  // Redirects to Login if User Not Logged In
  if (!user) return null;

  // Fetches Reserved Books for this User Only
  useEffect(() => {
    async function fetchReservedBooks() {
      try {
        const res = await fetch(`${API}/users/${user.id}/reservations`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch reserved books");
        const data = await res.json();
        setBooks(data.books || []);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchReservedBooks();
  }, [user.id, token]);

  // Return Reserved Book Function
  const handleReturn = async (bookId) => {
    try {
      const res = await fetch(`${API}/books/${bookId}/return`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to return book");

      // Updates State: Marks Books As Returned
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <article>
      <h1>My Account</h1>

      <section>
        <h2>Profile Info</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <button onClick={logout}>Logout</button>
      </section>

      <section>
        <h2>My Reserved Books</h2>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {books.length === 0 ? (
          <p>You have no reserved books.</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <strong>{book.title}</strong> - {book.author}
                </Link>
                <button onClick={() => handleReturn(book.id)}>Return</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
