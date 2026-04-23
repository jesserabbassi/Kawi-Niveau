import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import AppLayout from "../components/AppLayout";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <AppLayout>
      <h1 className="page-title">Courses</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div className="course-grid">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              {course.thumbnailUrl && (
                <img src={course.thumbnailUrl} alt={course.title} />
              )}

              <div className="course-card-body">
                <h3>{course.title}</h3>
                <p>{course.description}</p>

                <div className="course-meta">Category: {course.category || "-"}</div>
                <div className="course-meta">Level: {course.level || "-"}</div>
                <div className="course-meta">
                  Price: {course.isFree ? "Free" : `${course.price} TND`}
                </div>

                <div style={{ marginTop: "10px" }}>
                  <span className={`badge ${course.isPublished ? "badge-published" : "badge-draft"}`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="course-actions">
                  <Link to={`/courses/${course.id}`}>View details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}

export default CoursesPage;