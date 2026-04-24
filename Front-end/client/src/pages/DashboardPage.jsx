import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import api from "../api/api";

function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [stats, setStats] = useState({
    enrollments: 0,
    completedLessons: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [enrollmentsRes, progressRes] = await Promise.all([
          api.get("/enrollments/my"),
          api.get("/progress/my")
        ]);

        setStats({
          enrollments: enrollmentsRes.data.length,
          completedLessons: progressRes.data.filter((p) => p.isCompleted).length
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadStats();
  }, []);

  return (
    <AppLayout>
      <h1 className="page-title">Dashboard</h1>

      <div className="grid grid-2">
        <div className="metric-card">
          <div className="metric-label">Welcome back</div>
          <div className="metric-value metric-value--compact">
            {user?.fullName || "User"}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Role</div>
          <div className="metric-value metric-value--compact">
            {user?.role || "-"}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">My Enrolled Courses</div>
          <div className="metric-value">{stats.enrollments}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Completed Lessons</div>
          <div className="metric-value">{stats.completedLessons}</div>
        </div>
      </div>
    </AppLayout>
  );
}

export default DashboardPage;
