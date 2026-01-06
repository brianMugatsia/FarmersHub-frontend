import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChartLine, BookOpen, Users, Radius } from "lucide-react"; //  icons
import "./Navbar.css";
import farmersicon from "../assets/farmersicon.png"

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  //  Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function onDocClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  //  Navigate when clicking dropdown item
  function handleNav(path) {
    setOpen(false);
    navigate(path);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold d-flex align-items-center " to="/">
        <img
            src={farmersicon}
            alt="Farmers Hub Logo"
            className="spinning-icon"
            style={{
            width: "35px",
            height: "35px",
            objectFit: "contain",
            marginRight: "8px",
            borderRadius:"17px"
          }}
        />
        <span className="ms-2">Farmers Hub</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/marketplace">
                Marketplace
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>

            {/*  Features dropdown at end */}
            <li className="nav-item nav-item-features" style={{ position: "relative" }}>
              <button
                ref={buttonRef}
                className="btn btn-outline-light btn-sm features-btn d-flex align-items-center"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                 <span className="ms-1">Features</span>
              </button>

              {/* React-controlled dropdown */}
              {open && (
                <div ref={dropdownRef} className="features-dropdown shadow-sm bg-white rounded">
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => handleNav("/insights")}
                    type="button"
                  >
                    <ChartLine size={18} className="me-2 text-success" /> Insights
                  </button>

                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => handleNav("/training")}
                    type="button"
                  >
                    <BookOpen size={18} className="me-2 text-success" /> Training
                  </button>

                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => handleNav("/community")}
                    type="button"
                  >
                    <Users size={18} className="me-2 text-success" /> Community
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
