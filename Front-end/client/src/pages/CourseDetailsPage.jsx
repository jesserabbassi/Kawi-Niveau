import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <Link to="/courses">← Back to courses</Link>

      {loading && <p>Loading course...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {course && (
        <>
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <h2>Lessons</h2>

          {course.lessons && course.lessons.length > 0 ? (
            <ul>
              {course.lessons.map((lesson) => (
                <li key={lesson.id} style={{ marginBottom: "16px" }}>
                  <strong>{lesson.order}. {lesson.title}</strong>
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

          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
}

export default CourseDetailsPage;