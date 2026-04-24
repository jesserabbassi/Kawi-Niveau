import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import api from "../api/api";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateRole = async (id, role) => {
    try {
      await api.put(`/users/${id}/role`, { role });
      setMessage("Role updated successfully");
      loadUsers();
    } catch (err) {
      setMessage("Failed to update role");
    }
  };

  const updateStatus = async (id, isActive) => {
    try {
      await api.put(`/users/${id}/status`, { isActive });
      setMessage("User status updated successfully");
      loadUsers();
    } catch (err) {
      setMessage("Failed to update status");
    }
  };

  return (
    <AppLayout>
      <h1 className="page-title">Users</h1>

      {message && <p className="text-success">{message}</p>}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === "Admin" ? "badge-admin" : "badge-student"}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.isActive ? "badge-active" : "badge-inactive"}`}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-group">
                    <button onClick={() => updateRole(user.id, "Admin")}>Make Admin</button>
                    <button onClick={() => updateRole(user.id, "Student")}>Make Student</button>
                    <button onClick={() => updateStatus(user.id, !user.isActive)}>
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

export default UsersPage;
