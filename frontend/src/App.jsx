import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Books from "./pages/member/Books/Books";
import BookDetail from "./pages/BookDetail/BookDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import History from "./pages/member/History/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<div className="p-10">Profile Page (coming soon)</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;