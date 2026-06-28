import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import Footer from "./components/layout/Footer/Footer"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("digly_user");
    const savedToken = localStorage.getItem("digly_token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8F5F0]">Loading Session...</div>;
  }

  const MemberLayoutWrapper = ({ children }) => (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <MemberLayoutWrapper>
            <Home isLoggedIn={isLoggedIn} user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          </MemberLayoutWrapper>
        } 
      />
      <Route 
        path="/books" 
        element={
          <MemberLayoutWrapper>
            <Books isLoggedIn={isLoggedIn} user={user} />
          </MemberLayoutWrapper>
        } 
      />
      <Route 
        path="/books/:id" 
        element={
          <MemberLayoutWrapper>
            <BookDetail isLoggedIn={isLoggedIn} />
          </MemberLayoutWrapper>
        } 
      />
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <MemberLayoutWrapper>
              <Profile isLoggedIn={isLoggedIn} user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            </MemberLayoutWrapper>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/history"
        element={
          isLoggedIn ? (
            <MemberLayoutWrapper>
              <History isLoggedIn={isLoggedIn} />
            </MemberLayoutWrapper>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
      <Route path="/register" element={<Register />} />

      <Route 
        path="/admin/dashboard" 
        element={isLoggedIn && user?.role === "admin" ? <Dashboard user={user} /> : <Navigate to="/" />} 
      />
      <Route 
        path="/admin/books" 
        element={isLoggedIn && user?.role === "admin" ? <KelolaBooks user={user} /> : <Navigate to="/" />} 
      />
      <Route 
        path="/admin/users" 
        element={isLoggedIn && user?.role === "admin" ? <Users user={user} /> : <Navigate to="/" />} 
      />
      <Route 
        path="/admin/loans" 
        element={isLoggedIn && user?.role === "admin" ? <Loans user={user} /> : <Navigate to="/" />} 
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;