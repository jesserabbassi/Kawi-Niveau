import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load courses");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Courses</h1>
        <div>
          <span style={{ marginRight: "12px" }}>
            {user ? `${user.fullName} (${user.role})` : ""}
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {loading && <p>Loading courses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && courses.length === 0 && <p>No courses found.</p>}

      {!loading && !error && courses.length > 0 && (
        <ul>
          {courses.map((course) => (
            <li key={course.id} style={{ marginBottom: "12px" }}>
              <strong>{course.title}</strong> - {course.description}{" "}
              <Link to={`/courses/${course.id}`}>View details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CoursesPage;