import React, { useState } from "react";
import apiClient from "./apiClient";
import theme from "./theme";

function CareerForm() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [workStyle, setWorkStyle] = useState("analytical");
  const [result, setResult] = useState(null);

  const parseList = (value) =>
    value
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

  const submitCareerForm = async () => {
    try {
      const res = await apiClient.post("/careers/recommend", {
        skills: parseList(skills),
        interests: parseList(interests),
        workStyle,
      });

      setResult(res.data.recommendedCareer);
    } catch (err) {
      alert("Error generating recommendation");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <p style={styles.badge}>Smart suggestions</p>
        <h2 style={styles.title}>Career Recommendation</h2>
        <p style={styles.helper}>Describe your strengths, interests, and preferred work style.</p>
      </div>

      <div style={styles.fields}>
        <label style={styles.label}>
          Skills
          <input
            placeholder="e.g., javascript, public speaking, data analysis"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            style={styles.input}
          />
          <span style={styles.hint}>Use commas to separate multiple skills.</span>
        </label>

        <label style={styles.label}>
          Interests
          <input
            placeholder="e.g., design, healthcare, teaching"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            style={styles.input}
          />
          <span style={styles.hint}>Tell us what motivates you or sparks curiosity.</span>
        </label>

        <label style={styles.label}>
          Preferred work style
          <div style={styles.selectWrap}>
            <select
              value={workStyle}
              onChange={(e) => setWorkStyle(e.target.value)}
              style={styles.select}
            >
              <option value="analytical">Analytical</option>
              <option value="creative">Creative</option>
              <option value="social">Social</option>
              <option value="technical">Technical</option>
            </select>
            <div style={styles.selectGlow} />
          </div>
        </label>
      </div>

      <div style={styles.actions}>
        <button onClick={submitCareerForm} style={styles.button} className="button-hover">
          Get recommendation
        </button>
        <p style={styles.caption}>Powered by your unique mix of talents and preferences.</p>
      </div>

      {result && (
        <div style={styles.resultCard} className="card-animate">
          <div style={styles.resultTop}>
            <div style={styles.resultBadge}>Result</div>
            <span style={styles.status}>Personalized</span>
          </div>
          <p style={styles.resultTitle}>Recommended career</p>
          <p style={styles.resultValue}>{result}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    textAlign: "left",
    color: theme.colors.textPrimary,
    display: "grid",
    gap: theme.spacing.md,
  },
  header: {
    display: "grid",
    gap: "6px",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: theme.radii.md,
    background: theme.gradients.glassEdge,
    color: theme.colors.textSecondary,
    border: `1px solid ${theme.colors.border}`,
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontSize: "22px",
    color: theme.colors.textPrimary,
  },
  helper: {
    margin: 0,
    color: theme.colors.textSecondary,
    fontSize: "14px",
  },
  fields: {
    display: "grid",
    gap: theme.spacing.sm,
  },
  label: {
    display: "grid",
    gap: theme.spacing.xs,
    fontSize: "14px",
    color: theme.colors.textPrimary,
    letterSpacing: "0.2px",
  },
  input: {
    ...theme.input(),
  },
  selectWrap: {
    position: "relative",
  },
  select: {
    ...theme.input(),
    appearance: "none",
    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  },
  selectGlow: {
    position: "absolute",
    inset: 2,
    borderRadius: theme.radii.md,
    pointerEvents: "none",
    boxShadow: "0 0 0 1px rgba(103, 232, 249, 0.2)",
    filter: "blur(8px)",
    opacity: 0.5,
  },
  hint: {
    color: theme.colors.textSecondary,
    fontSize: "12px",
  },
  actions: {
    display: "grid",
    gap: "6px",
    alignItems: "center",
  },
  button: {
    ...theme.button("primary"),
    color: "#041024",
    width: "100%",
    textAlign: "center",
  },
  caption: {
    margin: 0,
    color: theme.colors.textSecondary,
    fontSize: "13px",
  },
  resultCard: {
    marginTop: "8px",
    ...theme.glassPanel("18px"),
    background: "linear-gradient(145deg, rgba(16,185,129,0.16), rgba(14,165,233,0.12))",
  },
  resultTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultBadge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: theme.radii.md,
    background: "rgba(16,185,129,0.2)",
    color: "#bbf7d0",
    border: "1px solid rgba(16,185,129,0.35)",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  status: {
    color: theme.colors.textSecondary,
    fontSize: "12px",
  },
  resultTitle: {
    margin: "12px 0 2px",
    fontSize: "14px",
    color: "#dcfce7",
  },
  resultValue: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 800,
    color: "#f0fdf4",
  },
};

export default CareerForm;