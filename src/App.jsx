import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Books from "./pages/Books.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages first to avoid conflicts */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Default redirect to books */}
        <Route path="/" element={<Navigate to="/books" />} />
        {/* Books pages */}
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        {/* User account */}
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}
