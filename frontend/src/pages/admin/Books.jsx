import AdminLayout from "../../components/admin/AdminLayout";

export default function Books() {
  return (
    <AdminLayout>
      <div style={styles.header}>
        <h1>Kelola Buku</h1>

        <div style={styles.actions}>
          <input
            placeholder="Cari buku..."
            style={styles.search}
          />

          <button style={styles.addBtn}>+ Tambah Buku</button>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Laskar Pelangi</td>
            <td>Andrea Hirata</td>
            <td>5</td>
            <td>
              <button style={styles.edit}>Edit</button>
              <button style={styles.delete}>Hapus</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Bumi Manusia</td>
            <td>Pramoedya</td>
            <td>3</td>
            <td>
              <button style={styles.edit}>Edit</button>
              <button style={styles.delete}>Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </AdminLayout>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },

  search: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd"
  },

  addBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  table: {
    width: "100%",
    background: "white",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden"
  },

  edit: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    marginRight: "5px",
    padding: "5px 10px",
    borderRadius: "5px"
  },

  delete: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px"
  }
};