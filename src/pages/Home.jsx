import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  CloudSun,
  BookOpen,
  Users,
  Sun,
  Sprout,
  Wheat,
  Leaf,
} from "lucide-react";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import marketImg from "../assets/market.png";
import insightsImg from "../assets/insights.png";
import trainingImg from "../assets/training.png";
import communityImg from "../assets/community.png";
import "./Home.css";

export default function Home() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const API_KEY = "fd791949d6f549ca23643380447cc500";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          )
            .then((res) => res.json())
            .then((data) => {
              setWeather({
                city: data.name,
                temp: data.main.temp,
                condition: data.weather[0].description,
              });
            })
            .catch((err) => console.error("Weather fetch error:", err));
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Nairobi&units=metric&appid=${API_KEY}`
          )
            .then((res) => res.json())
            .then((data) => {
              setWeather({
                city: data.name,
                temp: data.main.temp,
                condition: data.weather[0].description,
              });
            });
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  return (
    <div className="body">
      {/* ✅ HERO SECTION */}
      <section className="text-white text-center rounded">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner rounded">
            {/* SLIDE 1 */}
            <div className="carousel-item active">
              <img
                src={hero1}
                className="d-block w-100"
                alt="Farm 1"
                style={{ height: "90vh", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <h1 className="fw-bold display-4 text-shadow">
                  Welcome to Farmers Hub
                </h1>
                <p className="lead mb-4 px-3">
                  Empowering farmers with access to markets, training, and
                  digital tools.
                </p>
                <div>
                  <Link
                    to="/marketplace"
                    className="btn btn-success me-3 px-4 py-2"
                  >
                    Explore Marketplace
                  </Link>
                  <Link to="/register" className="btn btn-success px-4 py-2">
                    Join as Farmer
                  </Link>
                </div>
              </div>
            </div>

            {/* SLIDE 2 */}
            <div className="carousel-item">
              <img
                src={hero2}
                className="d-block w-100"
                alt="Farm 2"
                style={{ height: "90vh", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <h1 className="fw-bold display-4 text-shadow d-flex align-items-center justify-content-center gap-2">
                  <CloudSun size={42} /> Grow Smarter with Insights
                </h1>
                <p className="lead mb-4 px-3">
                  Get real-time weather and crop data for better decisions.
                </p>
              </div>
            </div>

            {/* SLIDE 3 */}
            <div className="carousel-item">
              <img
                src={hero3}
                className="d-block w-100"
                alt="Farm 3"
                style={{ height: "90vh", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <h1 className="fw-bold display-4 text-shadow d-flex align-items-center justify-content-center gap-2">
                  <Users size={42} /> Join Our Farmer Community
                </h1>
                <p className="lead mb-4 px-3">
                  Learn, share, and connect with other farmers nationwide.
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* ✅ 2. KEY FEATURES (Image Cards) */}
      <section className="container my-5 px-3 px-md-0 text-center training-section">
        <h2 className="text-center fw-bold text-success mb-4">
          Our Key Features
        </h2>
        <div className="row text-center">
          {/* CARD 1 - Marketplace */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0 ">
              <img
                src={marketImg}
                alt="Marketplace"
                className="card-img-top rounded"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold d-flex align-items-center justify-content-center text-success gap-2">
                  <ShoppingBag size={20} /> Marketplace Access
                </h5>
                <p className="card-text">
                  Buy and sell fresh farm produce directly — no middlemen, just
                  better prices.
                </p>
                <Link to="/marketplace" className="btn btn-success btn-sm">
                  Visit Marketplace
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 2 - Insights */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={insightsImg}
                alt="Farming Insights"
                className="card-img-top rounded"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold text-success d-flex align-items-center justify-content-center gap-2">
                  <CloudSun size={20} /> Farming Insights
                </h5>
                <p className="card-text">
                  Get real-time weather, soil data, and crop advice for smarter
                  farming.
                </p>
                {weather ? (
                  <div className="bg-light p-2 rounded mb-2">
                    <p className="mb-1 fw-bold text-success d-flex align-items-center justify-content-center gap-2">
                      <Sun size={18} /> {weather.city} — {weather.temp}°C
                    </p>
                    <small className="text-muted">
                      Condition: {weather.condition}
                    </small>
                  </div>
                ) : (
                  <p>Loading weather...</p>
                )}
                <Link to="/insights" className="btn btn-success btn-sm">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 3 - Training */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={trainingImg}
                alt="Training"
                className="card-img-top rounded"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-success fw-bold d-flex align-items-center justify-content-center gap-2">
                  <BookOpen size={20} /> Training Hub
                </h5>
                <p className="card-text">
                  Learn best farming practices from experts and other successful
                  farmers.
                </p>
                <Link to="/training" className="btn btn-success btn-sm">
                  View Training
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 4 - Community */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={communityImg}
                alt="Community"
                className="card-img-top rounded"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-success fw-bold d-flex align-items-center justify-content-center gap-2">
                  <Users size={20} /> Community Forum
                </h5>
                <p className="card-text">
                  Connect with fellow farmers, share your stories, and grow
                  together.
                </p>
                <Link to="/community" className="btn btn-success btn-sm">
                  Join Forum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ 3. TESTIMONIALS SECTION */}
      <section className="bg-light py-5 farmers-feedback">
        <div className="container text-center">
          <h2 className="fw-bold text-success mb-4">What Our Farmers Say</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p className="fst-italic">
                    “I increased my profits by 40% after joining Farmers Hub! The
                    marketplace is so easy to use.”
                  </p>
                  <h6 className="fw-bold text-success mt-3 d-flex align-items-center justify-content-center gap-2">
                    <Sprout size={18} /> — Mary Njoroge
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p className="fst-italic">
                    “Weather updates and training tips helped me avoid crop
                    losses last season. Amazing platform!”
                  </p>
                  <h6 className="fw-bold text-success mt-3 d-flex align-items-center justify-content-center gap-2">
                    <Wheat size={18} /> — Peter Otieno
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p className="fst-italic">
                    “The community forum is a blessing. I’ve learned so much from
                    other farmers.”
                  </p>
                  <h6 className="fw-bold text-success mt-3 d-flex align-items-center justify-content-center gap-2">
                    <Leaf size={18} /> — Jane Mwangi
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
