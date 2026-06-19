import AdminLayout from "../../components/admin/AdminLayout";

export default function Loans() {
  return (
    <AdminLayout>
      <div style={styles.header}>
        <h1>Kelola Peminjaman</h1>

        <input placeholder="Cari peminjaman..." style={styles.search} />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Buku</th>
            <th>Tgl Pinjam</th>
            <th>Tgl Kembali</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Kafka</td>
            <td>Laskar Pelangi</td>
            <td>01-06-2026</td>
            <td>08-06-2026</td>
            <td><span style={styles.active}>Dipinjam</span></td>
            <td>
              <button style={styles.return}>Return</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Alya</td>
            <td>Bumi Manusia</td>
            <td>25-05-2026</td>
            <td>01-06-2026</td>
            <td><span style={styles.done}>Dikembalikan</span></td>
            <td>
              <button style={styles.disabled}>Done</button>
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

  search: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd"
  },

  table: {
    width: "100%",
    background: "white",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden"
  },

  active: {
    background: "#f59e0b",
    color: "white",
    padding: "4px 8px",
    borderRadius: "5px"
  },

  done: {
    background: "#22c55e",
    color: "white",
    padding: "4px 8px",
    borderRadius: "5px"
  },

  return: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px"
  },

  disabled: {
    background: "#94a3b8",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "not-allowed"
  }
};