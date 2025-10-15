import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Register, { registerAction } from "./pages/Register";
import Login, { loginAction } from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route
          path="/register"
          element={<Register />}
          action={registerAction}
        />
        <Route path="/login" element={<Login />} action={loginAction} />
      </Routes>
    </BrowserRouter>
  );
}
