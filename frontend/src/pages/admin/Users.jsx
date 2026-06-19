import AdminLayout from "../../components/admin/AdminLayout";

export default function Users() {
  return (
    <AdminLayout>
      <div style={styles.header}>
        <h1>Kelola User</h1>

        <input placeholder="Cari user..." style={styles.search} />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Kafka</td>
            <td>kafka@mail.com</td>
            <td>Active</td>
            <td>
              <button style={styles.block}>Block</button>
              <button style={styles.delete}>Delete</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Alya</td>
            <td>alya@mail.com</td>
            <td>Active</td>
            <td>
              <button style={styles.block}>Block</button>
              <button style={styles.delete}>Delete</button>
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

  block: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
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