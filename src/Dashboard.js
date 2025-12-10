import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CareerForm from "./CareerForm";
import theme from "./theme";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
      <div style={styles.grid}>
        <div style={styles.card} className="card-animate">
          <div style={styles.cardTop}>
            <div style={styles.avatar}>{user.name?.[0]}</div>
            <div>
              <h2 style={styles.title}>Welcome back, {user.name}</h2>
              <p style={styles.subText}>{user.email}</p>
            </div>
          </div>

          <div style={styles.pillRow}>
            <span style={styles.pill}>Profile synced</span>
            <span style={styles.pillSecondary}>Personalized journey</span>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            style={styles.logoutBtn}
            className="button-hover"
          >
            Logout
          </button>
        </div>

        <div style={styles.card} className="card-animate">
          <CareerForm />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "0 4px 40px",
  },
  grid: {
    display: "grid",
    gap: theme.spacing.md,
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    alignItems: "start",
  },
  card: {
    ...theme.glassPanel("24px"),
    color: theme.colors.textPrimary,
    position: "relative",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: "58px",
    height: "58px",
    borderRadius: theme.radii.lg,
    background: theme.gradients.secondary,
    display: "grid",
    placeItems: "center",
    fontSize: "24px",
    fontWeight: 800,
    color: "#041024",
    boxShadow: theme.shadows.glow,
  },
  title: {
    fontSize: "22px",
    margin: 0,
    fontWeight: 700,
  },
  subText: {
    fontSize: "14px",
    color: theme.colors.textSecondary,
    margin: "4px 0 0",
  },
  pillRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: theme.spacing.sm,
  },
  pill: {
    padding: "8px 12px",
    background: "rgba(99,102,241,0.16)",
    borderRadius: "999px",
    border: "1px solid rgba(99,102,241,0.3)",
    color: "#c7d2fe",
    fontSize: "12px",
    fontWeight: 700,
  },
  pillSecondary: {
    padding: "8px 12px",
    background: "rgba(14,165,233,0.14)",
    borderRadius: "999px",
    border: "1px solid rgba(14,165,233,0.3)",
    color: "#bae6fd",
    fontSize: "12px",
    fontWeight: 700,
  },
  logoutBtn: {
    ...theme.button("danger"),
    color: "#0b1224",
    width: "fit-content",
  },
};

export default Dashboard