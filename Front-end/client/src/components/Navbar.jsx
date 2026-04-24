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
    <header className="topbar">
      <div className="topbar__brand">
        <p className="topbar__eyebrow">Kawi Niveau</p>
        <h2 className="topbar__title">LearnFlow</h2>
      </div>

      <div className="topbar__actions">
        {user && (
          <div className="topbar__user">
            <span className="topbar__name">{user.fullName}</span>
            <span className={`badge ${user.role === "Admin" ? "badge-admin" : "badge-student"}`}>
              {user.role}
            </span>
          </div>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;
