import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Link API
const API = import.meta.env.VITE_API;

// Loads Book Details
export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  // Fetches Books
  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`${API}/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
        const data = await res.json();
        setBook(data.book);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchBook();
  }, [id]);

  // Logging Error If No Books Loaded
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Loading book details...</p>;

  // Displays Books
  return (
    <div>
      <h1>{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <Link to="/books">Back to Book Catalog</Link>
    </div>
  );
}
