import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "64px",
        background: "#111827",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #1f2937"
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: "22px" }}>LearnFlow</h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user && (
          <>
            <span>{user.fullName}</span>
            <span className={`badge ${user.role === "Admin" ? "badge-admin" : "badge-student"}`}>
              {user.role}
            </span>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;