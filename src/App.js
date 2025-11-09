import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import "./App.css";

function App() {
  const [page, setPage] = useState("register");

  return (
    <div className="App">
      <h1>Career Path Recommendation System</h1>
      <div>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("login")}>Login</button>
      </div>

      {page === "register" ? <Register /> : <Login />}
    </div>
  );
}

export default App;
