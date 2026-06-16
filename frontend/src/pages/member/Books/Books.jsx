import { useState } from "react";
import Navbar from "../../../components/layout/Navbar/Navbar";
import BookCard from "../../../components/books/BookCard/BookCard";
import books from "../../../data/books";

function Books() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0]">
        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* HEADER */}
          <div className="mb-10">
            <h1
              className="text-5xl text-[#3E2F26]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              All Books
            </h1>

            <p className="mt-2 text-[#6B5B4D]">
              Explore our complete collection of books.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mb-10">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md rounded-full border border-[#D8CDBF] bg-white px-6 py-3 outline-none focus:border-[#8B6F47]"
            />
          </div>

          {/* BOOK GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                category={book.category}
              />
            ))}
          </div>

        </div>
      </main>
    </>
  );
}

export default Books;