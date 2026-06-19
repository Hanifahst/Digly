import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-3 rounded-xl mb-2 transition ${
      location.pathname === path
        ? "bg-[#F3ECE2] text-[#8B6F47] font-semibold"
        : "text-[#6B5B4D] hover:bg-[#F3ECE2]"
    }`;

  return (
    <aside className="w-[240px] fixed h-full bg-[#FFFDF9] border-r border-[#E7DDD0] p-6">
      <h1
        className="text-3xl mb-10 text-[#3E2F26]"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        Digly Admin
      </h1>

      <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
        Dashboard
      </Link>

      <Link to="/admin/books" className={linkClass("/admin/books")}>
        Books
      </Link>

      <Link to="/admin/users" className={linkClass("/admin/users")}>
        Users
      </Link>

      <Link to="/admin/loans" className={linkClass("/admin/loans")}>
        Loans
      </Link>
    </aside>
  );
}