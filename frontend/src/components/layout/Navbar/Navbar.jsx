import { Link, useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7DDD0] bg-[#F8F5F0]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-[#5C4432]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Digly
        </Link>

        {/* Menu */}
        <div className="hidden items-center gap-8 text-sm font-medium text-[#6B5B4D] md:flex">
          <Link
            to="/"
            className={`transition hover:text-[#8B6F47] ${
                location.pathname === "/" ? "text-[#8B6F47] font-semibold" : ""
            }`}
        >
            Home
        </Link>
        
        <Link
            to="/books"
            className={`transition hover:text-[#8B6F47] ${
                location.pathname === "/books" ? "text-[#8B6F47] font-semibold" : ""
            }`}
        >
            Books
        </Link>

        <Link
            to="/history"
            className={`transition hover:text-[#8B6F47] ${
                location.pathname === "/history" ? "text-[#8B6F47] font-semibold" : ""
            }`}
        >
            History
        </Link>

        <Link
            to="/profile"
            className={`transition hover:text-[#8B6F47] ${
                location.pathname === "/profile" ? "text-[#8B6F47] font-semibold" : ""
            }`}
        >
            Profile
        </Link>
        </div>

        <Link
          to="/login"
          className="rounded-full bg-[#6B4F3A] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#5A4230]"
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;