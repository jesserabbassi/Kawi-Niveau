function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.fullName}</p>
          <p>Role: {user.role}</p>
        </>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}

export default DashboardPage;