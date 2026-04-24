import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import AppLayout from "../components/AppLayout";

function CourseDetailsPage() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const markComplete = async (lessonId) => {
    setMessage("");

    try {
      await api.post("/progress/complete", {
        lessonId,
        isCompleted: true
      });

      setMessage("Lesson marked as completed");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update progress");
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError("Failed to load course details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <AppLayout>
      <div className="detail-shell">
        <Link to="/courses" className="back-link">Back to courses</Link>

        {loading && <p>Loading course...</p>}
        {error && <p className="text-danger">{error}</p>}

        {course && (
          <>
            <section className="detail-hero">
              <div>
                <h1 className="page-title">{course.title}</h1>
                <p className="detail-description">{course.description}</p>
              </div>

              <div className="detail-meta">
                <span className="badge badge-student">{course.category || "General"}</span>
                <span className="badge badge-admin">{course.level || "All levels"}</span>
              </div>
            </section>

            <section className="section-card">
              <h2 className="section-title">Lessons</h2>

              {course.lessons && course.lessons.length > 0 ? (
                <ul className="lesson-list">
                  {course.lessons.map((lesson) => (
                    <li key={lesson.id} className="lesson-item">
                      <div className="lesson-item__header">
                        <strong>{lesson.order}. {lesson.title}</strong>
                      </div>
                      <p>{lesson.content}</p>
                      <button onClick={() => markComplete(lesson.id)}>
                        Mark as completed
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No lessons found.</p>
              )}

              {message && <p className="text-success">{message}</p>}
            </section>
          </>
        )}
      </div>
    </AppLayout>
  );
}

export default CourseDetailsPage;
