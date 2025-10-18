import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Links API
const API = import.meta.env.VITE_API;

// Loads Book Details
export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  // Fetches Book Details
  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`${API}/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");

        const data = await res.json();

        setBook(data.book || data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchBook();
  }, [id]);

  // Error handling
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Loading book details...</p>;

  // Display book info
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
