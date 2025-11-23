import React, { useState, useEffect } from "react";
import axios from "axios";

function CareerForm({ externalWorkStyle }) {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [workStyle, setWorkStyle] = useState(externalWorkStyle || "analytical");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (externalWorkStyle) setWorkStyle(externalWorkStyle);
  }, [externalWorkStyle]);

  const submitCareerForm = async () => {
    setLoading(true);
    setResult([]);

    try {
      const formattedSkills = skills
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => ({ name: s })); // for embedding engine

      const formattedInterests = interests
        .split(",")
        .map(i => i.trim())
        .filter(Boolean);

      const res = await axios.post(
        "http://localhost:5000/api/recommend-online",
        {
          skills: formattedSkills,
          interests: formattedInterests,
          options: { topN: 6 }
        }
      );

      if (res.data.ok) {
        setResult(res.data.recommendations);
      } else {
        setResult([{ title: "Error", description: res.data.error }]);
      }
    } catch (err) {
      alert("Error generating AI recommendation");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Career Recommendation (AI Powered)</h2>

      <input
        placeholder="Your skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Your interests (comma separated)"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        style={styles.input}
      />

      <button onClick={submitCareerForm} style={styles.button}>
        {loading ? "Loading..." : "Get AI Recommendations"}
      </button>

      {result.length > 0 && (
        <div style={styles.resultBox}>
          <h3 style={styles.resultText}>Recommended Careers</h3>

          {result.map((r, idx) => (
            <div key={idx} style={styles.card}>
              <h3>{r.title}</h3>
              {r.score && <p>Score: {r.score}</p>}
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    color: "white"
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    fontWeight: "600"
  },
  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "15px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "12px",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)"
  },
  button: {
    padding: "12px 22px",
    background: "linear-gradient(135deg,#6a11cb,#2575fc)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    marginTop: "10px"
  },
  resultBox: {
    marginTop: 20,
    background: "rgba(255,255,255,0.06)",
    padding: 16,
    borderRadius: 12
  },
  resultText: {
    marginBottom: 6
  },
  card: {
    background: "rgba(0,0,0,0.25)",
    padding: "15px",
    borderRadius: "12px",
    marginTop: "12px",
    textAlign: "left"
  }
};

export default CareerForm;
