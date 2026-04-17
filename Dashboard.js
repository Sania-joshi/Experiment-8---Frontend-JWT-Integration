import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("User");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("⚠️ Unauthorized Access - Please login first");
      window.location.href = "/";
    } else {
      // Simulate getting user info
      setUser("Welcome, Developer");
    }
  }, [token]);

  const getData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:8080/protected", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      setData(res.data?.message || JSON.stringify(res.data));
    } catch (err) {
      setError("Failed to fetch data. Token may have expired.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  };

  return (
    <div className="dashboard-container">
      {/* Background elements */}
      <div className="dashboard-bg-gradient"></div>
      <div className="floating-blob blob-1"></div>
      <div className="floating-blob blob-2"></div>
      <div className="floating-blob blob-3"></div>

      {/* Navigation bar */}
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <div className="brand-icon">⚡</div>
            <h1 className="brand-title">JWT Auth</h1>
          </div>
          <div className="nav-user">
            <span className="user-name">{user}</span>
            <div className="user-avatar">👤</div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="dashboard-content">
        <div className="dashboard-card welcome-card">
          <div className="card-header">
            <h2 className="card-title">Welcome Back! 🎉</h2>
            <p className="card-subtitle">You've successfully authenticated with JWT</p>
          </div>

          <div className="welcome-info">
            <div className="info-item">
              <div className="info-icon">🔐</div>
              <div className="info-text">
                <h4>Secure Access</h4>
                <p>Your session is protected by JWT tokens</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">⚙️</div>
              <div className="info-text">
                <h4>Token Status</h4>
                <p>Active - Valid for 24 hours</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">✅</div>
              <div className="info-text">
                <h4>Verified</h4>
                <p>Identity confirmed via authentication</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card data-card">
          <div className="card-header">
            <h2 className="card-title">Protected Data</h2>
            <p className="card-subtitle">Fetch data from your secure backend</p>
          </div>

          <div className="data-section">
            {error && (
              <div className="error-alert">
                <span className="alert-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {data && !error && (
              <div className="data-display">
                <div className="data-success">
                  <div className="success-icon">✓</div>
                  <p className="data-content">{data}</p>
                </div>
              </div>
            )}

            {!data && !error && (
              <div className="data-placeholder">
                <div className="placeholder-icon">📦</div>
                <p>Click the button below to fetch protected data from your backend</p>
              </div>
            )}

            <button
              className={`fetch-button ${loading ? "loading" : ""}`}
              onClick={getData}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Fetching...
                </>
              ) : (
                <>
                  📥 Fetch Protected Data
                </>
              )}
            </button>
          </div>
        </div>

        <div className="dashboard-card stats-card">
          <div className="card-header">
            <h2 className="card-title">Session Information</h2>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Session Status</div>
              <div className="stat-value active">● Active</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Token Type</div>
              <div className="stat-value">JWT Bearer</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Last Action</div>
              <div className="stat-value">Just now</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Expiration</div>
              <div className="stat-value">24h</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="action-buttons">
        <button className="btn-secondary" onClick={logout}>
          <span>🚪</span> Logout
        </button>
        <a href="#" className="btn-link">
          View Documentation →
        </a>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>🔒 Your connection is secure and encrypted</p>
        <p className="footer-time">
          Last updated: {new Date().toLocaleString()}
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;