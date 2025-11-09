import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
const res = await axios.post("https://career-path-backend-production.up.railway.app/api/users/login", formData);
      
      // Show message
      alert(res.data.message);

      // ✅ If login was successful, save user info & redirect
      if (res.data.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/dashboard"; // Redirect to dashboard
      }

    } catch (error) {
      alert(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "40px",
    textAlign: "center",
  },
  form: {
    display: "inline-block",
    textAlign: "left",
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "8px 12px",
    width: "250px",
    borderRadius: "8px",
    border: "1px solid #aaa",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#2E86C1",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Login;
