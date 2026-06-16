import { useParams, useNavigate } from "react-router-dom";
import books from "../../data/books";
import Navbar from "../../components/layout/Navbar/Navbar";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div className="p-10 text-center text-[#6B5B4D]">
        Book not found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0]">
        <div className="mx-auto max-w-4xl px-6 py-16">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8CDBF] bg-[#FFFDF9] px-5 py-2.5 text-sm font-medium text-[#6B4F3A] shadow-sm transition hover:bg-[#6B4F3A] hover:text-white hover:shadow-md"
          >
            ← Back
          </button>

          {/* BOOK CONTENT */}
          <div className="rounded-3xl border border-[#E7DDD0] bg-[#FFFDF9] p-10">

            <span className="text-sm uppercase tracking-[0.2em] text-[#8B6F47]">
              {book.category}
            </span>

            <h1
              className="mt-4 text-5xl text-[#3E2F26]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {book.title}
            </h1>

            <p className="mt-3 text-lg text-[#6B5B4D]">
              by {book.author}
            </p>

            <div className="mt-10 h-72 rounded-2xl border border-[#D8CDBF] bg-[#EFE7DC]" />

            <p className="mt-6 leading-7 text-[#6B5B4D]">
                {book.description}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#6B5B4D]">
                <span className="rounded-full bg-[#F3ECE2] px-3 py-1">
                    {book.year}
                </span>
                <span className="rounded-full bg-[#F3ECE2] px-3 py-1">
                    {book.pages} pages
                </span>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}

export default BookDetail;