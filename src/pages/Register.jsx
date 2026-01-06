import React, { useState } from "react";
import farmersIcon from "../assets/farmersicon.png";
import "./Register.css";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch  {
        // If no JSON returned, fallback
        data.message = response.statusText;
      }

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setError("");
      setSuccess(data.message || "Registration successful! You can now log in.");

      // Optional: redirect to login after a few seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError(err.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className="register-container rounded d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src={farmersIcon}
            alt="Farmers Hub Logo"
            className="mb-2 spinning-icon"
            style={{ width: "60px", height: "60px", borderRadius: "30px" }}
          />
          <h3 className="text-success fw-bold mb-0">Create Your Account</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success w-100 fw-semibold py-2">Register</button>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <a href="/login" className="text-success fw-semibold text-decoration-none">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
