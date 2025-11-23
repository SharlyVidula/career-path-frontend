import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Navbar from "./components/Navbar";

// ⭐ ADD THIS IMPORT
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div>
        {/* 🔹 Navbar appears on ALL pages */}
        <Navbar />

        {/* 🔹 Page Title */}
        <h1 style={styles.title}>Career Path Recommendation System</h1>

        {/* 🔹 Routes */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ⭐ ADMIN ROUTE — THIS IS NEW */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  title: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
    color: "#2c3e50",
    fontSize: "28px",
    fontWeight: "bold",
  },
};

export default App;
