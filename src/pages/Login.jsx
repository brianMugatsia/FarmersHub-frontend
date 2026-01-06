import React, { useState } from "react";
import farmersIcon from "../assets/farmersicon.png";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // backend expects email and password
      });

      const data = await response.json(); // backend returns JSON: { "message": "..." }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setError("");
      setSuccess(data.message); // e.g., "Login successful!"

      // Save user info if needed
      localStorage.setItem("user", JSON.stringify({ email }));

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setError(err.message || "Login failed");
      setSuccess("");
    }
  };

  return (
    <div className="login-container rounded d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src={farmersIcon}
            alt="Farmers Hub Logo"
            className="mb-2 spinning-icon"
            style={{ width: "60px", height: "60px", borderRadius: "30px" }}
          />
          <h3 className="text-success fw-bold mb-0">Farmers Hub Login</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="#" className="text-success small text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button className="btn btn-success w-100 fw-semibold py-2">Login</button>

          <p className="text-center mt-3 mb-0">
            Don’t have an account?{" "}
            <a href="/register" className="text-success fw-semibold text-decoration-none">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
