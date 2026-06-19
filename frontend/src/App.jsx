import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Books from "./pages/member/Books/Books";
import BookDetail from "./pages/BookDetail/BookDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import History from "./pages/member/History/History";
import Profile from "./pages/member/Profile/Profile";
import Dashboard from "./pages/admin/Dashboard";
import KelolaBooks from "./pages/admin/Books";
import Users from "./pages/admin/Users";
import Loans from "./pages/admin/Loans";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/books" element={<KelolaBooks />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/loans" element={<Loans />} />
    </Routes>
  );
}

export default App;