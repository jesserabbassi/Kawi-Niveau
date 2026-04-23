import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const location = useLocation();

  const linkStyle = (path) => ({
    color: "white",
    padding: "10px 12px",
    borderRadius: "8px",
    background: location.pathname === path ? "#1f2937" : "transparent"
  });

  return (
    <div
      style={{
        width: "230px",
        background: "#0f172a",
        color: "white",
        minHeight: "calc(100vh - 64px)",
        padding: "20px 14px"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
        <Link to="/courses" style={linkStyle("/courses")}>Courses</Link>

        {user?.role === "Admin" && (
          <>
            <Link to="/admin" style={linkStyle("/admin")}>Admin</Link>
            <Link to="/users" style={linkStyle("/users")}>Users</Link>
            <Link to="/enrollments" style={linkStyle("/enrollments")}>Enrollments</Link>
            <Link to="/analytics" style={linkStyle("/analytics")}>Analytics</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;