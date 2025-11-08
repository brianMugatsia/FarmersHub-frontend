import React, { useEffect, useState } from "react";
import "./Insights.css";
import irrigation from "../assets/irrigation.png";
import compost from "../assets/compost.png";
import {
  Sun,
  Droplets,
  Wind,
  Lightbulb,
  RefreshCcw,
} from "lucide-react";

export default function Insights() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Nairobi");

  const [tips, setTips] = useState([
    {
      id: 1,
      text: "Water your crops early in the morning to reduce evaporation.",
      image: irrigation,
      author: "Admin",
      category: "Crops",
    },
    {
      id: 2,
      text: "Use organic compost to improve soil health.",
      image: compost,
      author: "Admin",
      category: "General",
    },
  ]);

  const [newTip, setNewTip] = useState({
    text: "",
    image: null,
    author: "",
    category: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeatherByCoords(position.coords),
        () => fetchWeather()
      );
    } else {
      fetchWeather();
    }
  }, []);

  async function fetchWeather() {
    setLoading(true);
    setError("");
    try {
      const apiKey = "fd791949d6f549ca23643380447cc500";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchWeatherByCoords(coords) {
    setLoading(true);
    setError("");
    try {
      const apiKey = "fd791949d6f549ca23643380447cc500";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
      setCity(data.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleTipSubmit = (e) => {
    e.preventDefault();
    if (!newTip.text || !newTip.author || !newTip.category) return;

    const tipToAdd = {
      id: tips.length + 1,
      text: newTip.text,
      image: newTip.image
        ? URL.createObjectURL(newTip.image)
        : "/assets/default-tip.jpg",
      author: newTip.author,
      category: newTip.category,
    };

    setTips([tipToAdd, ...tips]);
    setNewTip({ text: "", image: null, author: "", category: "" });
  };

  return (
    <>
      {/* Weather Section */}
      <div className="insights-container py-5">
        <div className="container">
          <h2 className="text-center text-light fw-bold mb-4">
            <Sun className="me-2" /> Farm Insights
          </h2>

          <div className="text-center mb-4">
            <input
              type="text"
              className="form-control d-inline w-auto me-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city..."
            />
            <button onClick={fetchWeather} className="btn btn-success">
              <RefreshCcw size={16} className="me-1" /> Refresh
            </button>
          </div>

          {loading && (
            <p className="text-center text-muted">Loading weather...</p>
          )}
          {error && <p className="text-center text-danger">{error}</p>}

          {weather && (
            <div className="card mx-auto shadow-sm weather-card">
              <div className="card-body text-center">
                <h4 className="text-success fw-bold mb-1">
                  {weather.name}, {weather.sys.country}
                </h4>
                <h2 className="display-5">
                  {Math.round(weather.main.temp)}°C
                </h2>
                <p className="text-muted mb-1">
                  {weather.weather[0].main} – {weather.weather[0].description}
                </p>
                <p className="mb-0">
                  <Droplets size={16} className="me-1 text-primary" />
                  Humidity: {weather.main.humidity}% |{" "}
                  <Wind size={16} className="me-1 text-info" />
                  Wind: {weather.wind.speed} m/s
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="container py-5">
        {/* Add Tip Form */}
        <div
          className="card shadow-sm p-4 mb-5 mx-auto share-tip-card"
          style={{ width: "90%", maxWidth: "1200px" }}
        >
          <h5 className="text-success fw-bold mb-3">
            <Lightbulb className="me-2" /> Share a Farm Tip
          </h5>
          <form onSubmit={handleTipSubmit} className="row g-3">
            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Write your tip here..."
                value={newTip.text}
                onChange={(e) =>
                  setNewTip({ ...newTip, text: e.target.value })
                }
                rows={3}
                required
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={newTip.category || ""}
                onChange={(e) =>
                  setNewTip({ ...newTip, category: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                <option value="Crops">Crops</option>
                <option value="Livestock">Livestock</option>
                <option value="Equipment">Equipment</option>
                <option value="Animal Products">Animal Products</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Your name"
                value={newTip.author || ""}
                onChange={(e) =>
                  setNewTip({ ...newTip, author: e.target.value })
                }
                required
              />
            </div>

            <div className="col-md-4">
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setNewTip({ ...newTip, image: e.target.files[0] })
                }
                accept="image/*"
              />
            </div>

            <div className="col-12 text-end">
              <button type="submit" className="btn btn-success">
                Add Tip
              </button>
            </div>
          </form>
        </div>

        {/* Tips Cards */}
        <div className="row">
          {tips.map((tip) => (
            <div key={tip.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={tip.image}
                  alt="Tip"
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <span className="badge bg-success mb-2">
                    {tip.category}
                  </span>
                  <p className="card-text">{tip.text}</p>
                  <small className="text-muted">By {tip.author}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
