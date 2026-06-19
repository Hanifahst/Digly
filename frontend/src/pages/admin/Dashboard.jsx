import AdminLayout from "../../components/admin/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1>Dashboard Admin</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "15px",
        marginTop: "20px"
      }}>
        <Card title="Total Buku" value="120" />
        <Card title="Total User" value="45" />
        <Card title="Peminjaman Aktif" value="18" />
      </div>
    </AdminLayout>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}