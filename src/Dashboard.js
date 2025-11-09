import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1>Welcome, {user?.name || "Guest"} 👋</h1>
      <p>Email: {user?.email}</p>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "60px",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#E74C3C",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Dashboard;
