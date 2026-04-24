import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const location = useLocation();

  const getLinkClassName = (path) =>
    `sidebar__link${location.pathname === path ? " is-active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar__nav">
        <Link to="/dashboard" className={getLinkClassName("/dashboard")}>Dashboard</Link>
        <Link to="/courses" className={getLinkClassName("/courses")}>Courses</Link>

        {user?.role === "Admin" && (
          <>
            <Link to="/admin" className={getLinkClassName("/admin")}>Admin</Link>
            <Link to="/users" className={getLinkClassName("/users")}>Users</Link>
            <Link to="/enrollments" className={getLinkClassName("/enrollments")}>Enrollments</Link>
            <Link to="/analytics" className={getLinkClassName("/analytics")}>Analytics</Link>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
