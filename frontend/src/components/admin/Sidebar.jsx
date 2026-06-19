import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={{ marginBottom: "20px" }}>📚 Admin Panel</h2>

      <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>
      <Link to="/admin/books" style={styles.link}>Kelola Buku</Link>
      <Link to="/admin/users" style={styles.link}>Kelola User</Link>
      <Link to="/admin/loans" style={styles.link}>Peminjaman</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#1e293b",
    color: "white",
    padding: "20px",
    position: "fixed"
  },
  link: {
    display: "block",
    color: "#cbd5e1",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "6px",
    marginTop: "10px"
  }
};