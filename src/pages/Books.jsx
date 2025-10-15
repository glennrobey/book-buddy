import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Loads API from .env file
const API = import.meta.env.VITE_API;

export default function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  // Fetch books from API
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(`${API}/books`);
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data.books);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchBooks();
  }, []);

  // Set Error
  if (error) return <p>Error: {error}</p>;
  if (!books.length) return <p>Loading books...</p>;

  // Display Book Catalog
  return (
    <div>
      <h1>Book Catalog</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {/* Link to individual book page */}
            <Link to={`/books/${book.id}`}>
              <strong>{book.title}</strong> - {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
