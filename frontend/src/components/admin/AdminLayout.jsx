import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
  },

  content: {
    marginLeft: "220px",
    padding: "20px",
    width: "100%",
    background: "#f4f6f9",
    minHeight: "100vh"
  }
};