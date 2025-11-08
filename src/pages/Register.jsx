import React from "react";
import farmersIcon from "../assets/farmersicon.png"; //  Your logo
import "./Register.css"; //  Styling file

export default function Register() {
  return (
    <div className="register-container  rounded d-flex align-items-center justify-content-center vh-100 bg-light">
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

        <form>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button className="btn btn-success w-100 fw-semibold py-2">
            Register
          </button>

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
