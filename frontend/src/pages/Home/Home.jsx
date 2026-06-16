import Navbar from "../../components/layout/Navbar/Navbar";
import BookCard from "../../components/books/BookCard/BookCard";
import books from "../../data/books";

function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Hero */}
          <section className="rounded-3xl border border-[#E7DDD0] bg-[#FFFDF9] p-8 md:p-12">
            <span className="text-sm uppercase tracking-[0.2em] text-[#8B6F47]">
              Digital Library
            </span>

            <h1
            className="mt-4 text-5xl leading-tight text-[#3E2F26] md:text-6xl"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
                Where Stories Meet Stillness
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6B5B4D]">
              Digly provides a comfortable digital space to explore books,
              expand knowledge, and enjoy reading anytime, anywhere.
            </p>

            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                placeholder="Search by title, author, or category..."
                className="flex-1 rounded-full border border-[#D8CDBF] bg-white px-6 py-3 outline-none transition focus:border-[#8B6F47]"
              />

              <button className="rounded-full bg-[#6B4F3A] px-8 py-3 font-medium text-white transition hover:bg-[#5A4230]">
                Search
              </button>
            </div>
          </section>

          {/* Featured */}
          <section className="mt-16">
            <div className="mb-8">
             <h2
             className="text-4xl font-semibold text-[#3E2F26]"
             style={{ fontFamily: '"Cormorant Garamond", serif' }}
             >
                Featured Collection
            </h2>
 

              <p className="mt-2 text-[#6B5B4D]">
                Carefully selected books worth exploring.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  category={book.category}
                />
              ))}
            </div>
          </section>

          {/* Recently Added */}
          <section className="mt-20 pb-12">
            <div className="mb-8">
              <h2
              className="text-4xl font-semibold text-[#3E2F26]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Recently Added
            </h2>

              <p className="mt-2 text-[#6B5B4D]">
                Discover the latest additions to the Digly library.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard
                  key={`recent-${book.id}`}
                  title={book.title}
                  author={book.author}
                  category={book.category}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Home;