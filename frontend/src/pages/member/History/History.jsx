import Navbar from "../../../components/layout/Navbar/Navbar";
import { useBorrow } from "../../../context/BorrowContext";
import BookCard from "../../../components/books/BookCard/BookCard";

function History() {
  const { borrowedBooks, returnBook } = useBorrow();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0]">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1
            className="text-5xl text-[#3E2F26]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Borrow History
          </h1>

          <p className="mt-2 text-[#6B5B4D]">
            Books you have borrowed
          </p>

          {borrowedBooks.length === 0 ? (
            <div className="mt-16 flex flex-col items-center justify-center text-center">
                <p className="text-[#6B5B4D]">
                    No books borrowed yet.
                </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {borrowedBooks.map((book) => (
                <div key={book.id}>
                  <BookCard
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    category={book.category}
                  />

                  <button
                    onClick={() => returnBook(book.id)}
                    className="mt-3 w-full rounded-full bg-red-500 py-2 text-white hover:bg-red-600"
                  >
                    Return Book
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </>
  );
}

export default History;