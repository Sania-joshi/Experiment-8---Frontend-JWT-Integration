import React, { useState, useRef } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const formRef = useRef(null);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/login", {
        username,
        password
      });

      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);

        // success animation
        formRef.current.classList.add("form-success");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 800);
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      setShake(true);

      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* Background */}
      <div className="background-gradient"></div>

      {/* Main Card */}
      <div className={`login-wrapper ${shake ? "shake" : ""}`}>
        <form className="login-form" ref={formRef} onSubmit={login}>

          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">Welcome Back</h1>
            <p className="form-subtitle">Secure access to your account</p>
          </div>

          {/* USERNAME */}
          <div className="input-group">
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>

            <div className="input-wrapper">
              <input
                id="username"
                type="text"
                className="input-field"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="input-icon">👤</span>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>

            <div className="input-wrapper">
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-icon">🔐</span>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className={`login-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          {/* FOOTER */}
          <div className="form-footer">
            <span className="footer-link">Forgot password?</span>
            <span className="footer-link">Sign up</span>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
