import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import api from "../api/api";

function AdminPage() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses");
      setCourses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/courses", {
        title,
        description,
        thumbnailUrl,
        price,
        isFree,
        category,
        level,
        isPublished
      });

      setTitle("");
      setDescription("");
      setThumbnailUrl("");
      setPrice(0);
      setIsFree(false);
      setCategory("");
      setLevel("");
      setIsPublished(false);
      setMessage("Course created successfully");
      fetchCourses();
    } catch (err) {
      setMessage("Failed to create course");
      console.error(err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      setMessage("Course deleted successfully");
      fetchCourses();
    } catch (err) {
      setMessage("Failed to delete course");
      console.error(err);
    }
  };

  return (
    <AppLayout>
      <h1 className="page-title">Admin Panel</h1>

      <div className="section-card" style={{ marginBottom: "24px" }}>
        <h3>Create Course</h3>

        <form onSubmit={createCourse}>
          <div className="grid grid-2">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Thumbnail URL</label>
              <input value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Level</label>
              <input value={level} onChange={(e) => setLevel(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <label>
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                style={{ width: "auto", marginRight: "8px" }}
              />
              Free
            </label>

            <label>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                style={{ width: "auto", marginRight: "8px" }}
              />
              Published
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">Create Course</button>
          </div>
        </form>

        {message && <p className="text-success">{message}</p>}
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.category || "-"}</td>
                <td>{course.level || "-"}</td>
                <td>{course.isFree ? "Free" : `${course.price} TND`}</td>
                <td>
                  <span className={`badge ${course.isPublished ? "badge-published" : "badge-draft"}`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  <button onClick={() => deleteCourse(course.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

export default AdminPage;