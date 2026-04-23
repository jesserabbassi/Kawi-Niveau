import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;