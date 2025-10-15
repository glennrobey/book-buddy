import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Books from "./pages/Books.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import Register, { registerAction } from "./pages/Register.jsx";
import Login, { loginAction } from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route
          path="/register"
          element={<Register />}
          action={registerAction}
        />
        <Route path="/login" element={<Login />} action={loginAction} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}
