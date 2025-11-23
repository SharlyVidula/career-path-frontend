import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CareerForm from "./CareerForm";
import PersonalityQuiz from "./PersonalityQuiz";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [workStyle, setWorkStyle] = useState("analytical"); // default

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      navigate("/login");
    } else {
      setUser(JSON.parse(data));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div style={styles.page}>
      <div style={styles.container} className="fade-in">
        <div style={styles.profileCard} className="slide-left">
          <div style={styles.avatar}>👤</div>
          <h2 style={styles.title}>Welcome, {user.name}</h2>
          <p style={styles.email}>{user.email}</p>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            style={styles.logoutBtn}
          >
            Logout
          </button>

          <div style={{ marginTop: 20 }}>
            <h4 style={{ marginBottom: 8 }}>Take a quick personality quiz</h4>
            <PersonalityQuiz onComplete={(style, scores) => {
              setWorkStyle(style);
              // optional: show a small toast — for now console
              console.log("Quiz done:", style, scores);
            }} />
          </div>
        </div>

        <div style={styles.careerCard} className="slide-right">
          {/* pass chosen workStyle into CareerForm */}
          <CareerForm externalWorkStyle={workStyle} />
        </div>
      </div>
    </div>
  );
}

// (styles same as your premium Dashboard earlier) — copy-paste the same block
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #141E30, #243B55)",
    padding: "40px",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "40px",
    flexWrap: "wrap",
  },

  profileCard: {
    flex: "1",
    minWidth: "300px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "25px",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
  },

  careerCard: {
    flex: "2",
    minWidth: "350px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "25px",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },

  avatar: {
    fontSize: "60px",
    marginBottom: "10px",
  },

  title: {
    fontSize: "26px",
    marginBottom: "10px",
  },

  email: {
    fontSize: "16px",
    opacity: "0.8",
    marginBottom: "20px",
  },

  logoutBtn: {
    padding: "12px 25px",
    backgroundColor: "#E74C3C",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

// animation styles appended by your previous Dashboard code — they remain the same
export default Dashboard;
