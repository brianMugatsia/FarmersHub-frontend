import React from "react";
import founder from "../assets/founder.jpg";
import pharies from "../assets/pharies.jpeg";
import sirngeno from "../assets/sirngeno.jpeg"
import "./About.css";

export default function About() {
  return (
    <div className="about-page container py-5">
      {/* Header */}
      <h2 className="text-center text-success fw-bold mb-4">
        About Farmers Hub
      </h2>

      {/* Mission Section */}
      <div className="text-center mb-4">
        <p className="lead text-info">
          Farmers Hub is an online platform connecting farmers, buyers, and equipment
          providers across Kenya. We empower local farmers by giving them a space to
          showcase their produce, find markets, and grow their agribusiness through
          digital innovation.
        </p>
        <p className="text-info">
          Our mission is to make agriculture profitable, accessible, and sustainable by
          bridging the gap between farmers and consumers — all from the comfort of their
          devices.
        </p>
        <p className="fst-italic text-danger text-center mb-5">
          “Empowering every farmer to grow more, earn more, and connect better.”
        </p>
        <p className="text-center">We are keeping spinning and shaping the nation </p>
      </div>

      {/* Team Section */}
      <h3 className="text-center text-success mb-4 fw-bold">Our Team</h3>

      <div className="row justify-content-center text-center">
        {/* Founder */}
        <div className="col-md-4 mb-4">
          <div className="team-card card border-0 shadow-sm p-3 h-100">
            <img
              src={founder}
              alt="Founder"
              className="rounded-circle mx-auto mb-3"
              style={{ height: "150px", width: "150px", objectFit: "cover" }}
            />
            <h5 className="team-name text-success fw-bold">Brian Mugatsia</h5>
            <p className="text-muted">Founder & CEO</p>
            <p className="small text-muted">
              Visionary behind Farmers Hub, leading the mission to digitize agriculture
              and empower small-scale farmers through technology.
            </p>
          </div>
        </div>

        {/* Co-Founder */}
        <div className="col-md-4 mb-4">
          <div className="team-card card border-0 shadow-sm p-3 h-100">
            <img
              src={sirngeno}
              alt="Co-Founder"
              className="rounded-circle mx-auto mb-3"
              style={{ height: "150px", width: "150px", objectFit: "cover" }}
            />
            <h5 className="team-name text-success fw-bold">Mr NGENO</h5>
            <p className="text-muted">Co-Founder</p>
            <p className="small text-muted">
              Co-leading Farmers Hub with dedication to improving access to reliable
              markets and fair trade for all farmers in Kenya.
            </p>
          </div>
        </div>
        {/* Co-Founder */}
        <div className="col-md-4 mb-4">
          <div className="team-card card border-0 shadow-sm p-3 h-100">
            <img
              src={pharies}
              alt="Co-Founder"
              className="rounded-circle mx-auto mb-3"
              style={{ height: "150px", width: "150px", objectFit: "cover" }}
            />
            <h5 className="team-name text-success fw-bold">Mr PHARIES</h5>
            <p className="text-muted">Co-Founder</p>
            <p className="small text-muted">
              Co-leading Farmers Hub with dedication to improving access to reliable
              markets and fair trade for all farmers in Kenya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
