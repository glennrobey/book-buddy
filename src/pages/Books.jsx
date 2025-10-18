import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Links API
const API = import.meta.env.VITE_API;

export default function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const { user, token } = useContext(AuthContext);

  // Fetches Books
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(`${API}/books`);
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data.books || data || []);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchBooks();
  }, []);
  // Handles Reserve Function
  const handleReserve = async (bookId) => {
    try {
      const res = await fetch(`${API}/books/${bookId}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reserve book");

      // Update UI for reserved book
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, isReserved: true } : book
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Handles Errors
  if (error) return <p>Error: {error}</p>;
  if (!books || books.length === 0) return <p>Loading books...</p>;

  // Shows Book Catalog
  return (
    <div>
      <h1>Book Catalog</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              <strong>{book.title}</strong> - {book.author}
            </Link>

            {user && (
              <button
                onClick={() => handleReserve(book.id)}
                disabled={book.isReserved}
              >
                {book.isReserved ? "Reserved" : "Reserve"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
