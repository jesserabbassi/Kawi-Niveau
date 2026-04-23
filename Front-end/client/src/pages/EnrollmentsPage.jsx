import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import api from "../api/api";

function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      const [enrollmentsRes, usersRes, coursesRes] = await Promise.all([
        api.get("/enrollments"),
        api.get("/users"),
        api.get("/courses")
      ]);

      setEnrollments(enrollmentsRes.data);
      setUsers(usersRes.data);
      setCourses(coursesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createEnrollment = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/enrollments", {
        userId: Number(userId),
        courseId: Number(courseId)
      });

      setMessage("Enrollment created successfully");
      setUserId("");
      setCourseId("");
      loadData();
    } catch (err) {
      setMessage("Failed to create enrollment");
    }
  };

  const deleteEnrollment = async (id) => {
    try {
      await api.delete(`/enrollments/${id}`);
      setMessage("Enrollment deleted successfully");
      loadData();
    } catch (err) {
      setMessage("Failed to delete enrollment");
    }
  };

  return (
    <AppLayout>
      <h1 className="page-title">Enrollments</h1>

      <div className="section-card" style={{ marginBottom: "24px" }}>
        <h3>Create Enrollment</h3>

        <form onSubmit={createEnrollment}>
          <div className="grid grid-2">
            <div className="form-group">
              <label>User</label>
              <select value={userId} onChange={(e) => setUserId(e.target.value)}>
                <option value="">Select user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Course</label>
              <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                <option value="">Select course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Create Enrollment</button>
          </div>
        </form>

        {message && <p className="text-success">{message}</p>}
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Course</th>
              <th>Status</th>
              <th>Enrolled At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>{enrollment.user?.fullName || "-"}</td>
                <td>{enrollment.course?.title || "-"}</td>
                <td>
                  <span className="badge badge-active">{enrollment.status}</span>
                </td>
                <td>{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => deleteEnrollment(enrollment.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

export default EnrollmentsPage;