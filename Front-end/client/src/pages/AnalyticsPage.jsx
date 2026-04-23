import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import api from "../api/api";

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await api.get("/admin/analytics");
        setAnalytics(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <AppLayout>
      <h1 className="page-title">Analytics</h1>

      {!analytics ? (
        <p>Loading analytics...</p>
      ) : (
        <div className="grid grid-3">
          <div className="metric-card">
            <div className="metric-label">Total Users</div>
            <div className="metric-value">{analytics.totalUsers}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Active Users</div>
            <div className="metric-value">{analytics.activeUsers}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Total Courses</div>
            <div className="metric-value">{analytics.totalCourses}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Published Courses</div>
            <div className="metric-value">{analytics.publishedCourses}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Total Enrollments</div>
            <div className="metric-value">{analytics.totalEnrollments}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Completed Lessons</div>
            <div className="metric-value">{analytics.totalCompletedLessons}</div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default AnalyticsPage;