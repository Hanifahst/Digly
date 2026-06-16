import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BookDetail from "./pages/BookDetail/BookDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/:id" element={<BookDetail />} />
    </Routes>
  );
}

export default App;