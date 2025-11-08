import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"; //  icons
import "./Footer.css"
import farmersicon from "../assets/farmersicon.png"

function Footer() {
  return (
    <footer  
        className="footer text-white pt-4 mt-5"
        style={{
        background: "linear-gradient(135deg, #198754 0%, #145a32 100%)",
    }}
    >
      <div className="container">
        <div className="row text-center text-md-start align-items-center">
          {/* Brand Section */}
          <div className="col-md-4 mb-3">
            <div className="d-flex justify-content-center justify-content-md-start align-items-center">
              <img
                src={farmersicon}
                alt="Farmers Hub Logo"
                className="spinning-icon"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                  marginRight: "10px",
                  borderRadius:"20px",
                }}
              />
              <h5 className="m-0 fw-bold">Farmers Hub</h5>
            </div>
            <p className="small mt-2 mb-0">
              Empowering farmers through digital solutions and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/marketplace" className="text-white text-decoration-none">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Connect With Us</h6>
            <p className="small mb-1">
              <Mail size={16} className="me-2" /> farmershub@gmail.com
            </p>
            <div className="d-flex justify-content-center justify-content-md-start mt-3 gap-3">
              <a href="#" className="text-white d-flex">
                <Facebook size={20} /> farmersHubKenya
              </a>
              <a href="#" className="text-white d-flex">
                <Instagram size={20} />farmersHubKenya
              </a>
              <a href="#" className="text-white d-flex">
                <Twitter size={20} />farmersHubKenya
              </a>
            </div>
          </div>
        </div>

        <hr className="border-light opacity-50 my-3" />
        <p className="text-center small mb-0">
          © {new Date().getFullYear()} Farmers Hub | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
