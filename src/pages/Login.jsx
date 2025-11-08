import React from "react";
import farmersIcon from "../assets/farmersicon.png"; // your logo image
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container rounded d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src={farmersIcon}
            alt="Farmers Hub Logo"
            className="mb-2 spinning-icon"
            style={{ width: "60px", height: "60px", borderRadius:"30px" }}
          />
          <h3 className="text-success fw-bold mb-0">Farmers Hub Login</h3>
        </div>

        <form>
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
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="remember" />
              <label className="form-check-lab-el" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="#" className="text-success small text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button className="btn btn-success w-100 fw-semibold py-2">
            Login
          </button>

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
