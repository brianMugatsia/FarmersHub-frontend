import React, { useState } from "react";
import { User, Video, ThumbsUp, Play, Share2 } from "lucide-react";
import "./Training.css";

export default function Training() {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Crop Rotation Techniques",
      description:
        "Learn how to rotate crops to improve soil health and increase yield.",
      video: "/assets/crop-rotation.mp4",
      category: "Crops",
      likes: 4,
      comments: [{ id: 1, author: "Farmer Amina", text: "Very helpful!" }],
      isYouTube: false,
    },
    {
      id: 2,
      title: "Organic Fertilizers",
      description:
        "Discover natural fertilizers that boost plant growth without chemicals.",
      video: "/assets/organic-fertilizer.mp4",
      category: "Soil",
      likes: 7,
      comments: [],
      isYouTube: false,
    },
    {
      id: 3,
      title: "Livestock Management",
      description:
        "Techniques for healthy livestock, disease prevention, and productivity.",
      video: "/assets/livestock.mp4",
      category: "Livestock",
      likes: 2,
      comments: [{ id: 1, author: "Farmer Otieno", text: "Good info!" }],
      isYouTube: false,
    },
  ]);

  const [newModule, setNewModule] = useState({
    title: "",
    description: "",
    category: "",
    video: null,
  });

  const [uploadType, setUploadType] = useState("file");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [activeVideo, setActiveVideo] = useState(null);

  const convertToEmbedUrl = (url) => {
    if (!url) return "";
    return url
      .replace("watch?v=", "embed/")
      .replace("youtu.be/", "youtube.com/embed/");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newModule.title || !newModule.description || !newModule.video) return;

    const moduleToAdd = {
      id: modules.length + 1,
      title: newModule.title,
      description: newModule.description,
      category: newModule.category || "General",
      video:
        uploadType === "file"
          ? URL.createObjectURL(newModule.video)
          : convertToEmbedUrl(newModule.video),
      likes: 0,
      comments: [],
      isYouTube: uploadType === "youtube",
    };

    setModules([moduleToAdd, ...modules]);
    setNewModule({ title: "", description: "", category: "", video: null });
  };

  const handleLike = (id) => {
    setModules(
      modules.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const handleComment = (id, text) => {
    if (!text) return;
    setModules(
      modules.map((m) =>
        m.id === id
          ? {
              ...m,
              comments: [
                ...m.comments,
                { id: m.comments.length + 1, author: "Farmer", text },
              ],
            }
          : m
      )
    );
  };

  const filteredModules = modules
    .filter(
      (m) =>
        (filter === "All" || m.category === filter) &&
        (m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.description.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === "Most Liked") return b.likes - a.likes;
      return b.id - a.id;
    });

  return (
    <div className="training-container py-5">
      <div className="container">
        <h2 className="text-center text-success fw-bold mb-4">
          <User className="me-2" /> Farm Training
        </h2>

        {/* Upload Form */}
        <div
          className="card shadow-sm p-4 mb-5 mx-auto"
          style={{ width: "90%", maxWidth: "1200px" }}
        >
          <h5 className="text-success fw-bold mb-3">
            <Video className="me-2" /> Share a Training Module
          </h5>

          <form onSubmit={handleUpload} className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Module Title"
                value={newModule.title}
                onChange={(e) =>
                  setNewModule({ ...newModule, title: e.target.value })
                }
                required
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category (optional)"
                value={newModule.category}
                onChange={(e) =>
                  setNewModule({ ...newModule, category: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <textarea
                className="form-control"
                placeholder="Description"
                value={newModule.description}
                onChange={(e) =>
                  setNewModule({ ...newModule, description: e.target.value })
                }
                required
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
              >
                <option value="file">Upload Video File</option>
                <option value="youtube">Use YouTube Link</option>
              </select>
            </div>

            <div className="col-md-6">
              {uploadType === "file" ? (
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setNewModule({ ...newModule, video: e.target.files[0] })
                  }
                  accept="video/*"
                  required
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Paste YouTube video link..."
                  value={newModule.video || ""}
                  onChange={(e) =>
                    setNewModule({ ...newModule, video: e.target.value })
                  }
                  required
                />
              )}
            </div>

            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">
                Upload
              </button>
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search modules..."
            style={{ width: "250px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            style={{ width: "180px" }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Crops</option>
            <option>Soil</option>
            <option>Livestock</option>
            <option>General</option>
          </select>

          <select
            className="form-select"
            style={{ width: "180px" }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option>Newest</option>
            <option>Most Liked</option>
          </select>
        </div>

        {/* Training Modules Grid */}
        <div className="row">
          {filteredModules.map((module) => (
            <div key={module.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                {module.isYouTube ? (
                  <iframe
                    width="100%"
                    height="200"
                    src={module.video}
                    title={module.title}
                    allowFullScreen
                    style={{
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  ></iframe>
                ) : (
                  <video
                    src={module.video}
                    controls
                    className="card-video"
                    style={{
                      width: "100%",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  ></video>
                )}

                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">
                    {module.title}
                  </h5>
                  {module.category && (
                    <span className="badge bg-success mb-2">
                      {module.category}
                    </span>
                  )}
                  <p className="card-text">{module.description}</p>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handleLike(module.id)}
                    >
                      <ThumbsUp size={16} className="me-1" /> {module.likes}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setActiveVideo(module.video)}
                    >
                      <Play size={16} className="me-1" /> Watch
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                      }
                    >
                      <Share2 size={16} className="me-1" /> Share
                    </button>
                  </div>

                  <div className="mt-3">
                    {module.comments.map((c) => (
                      <p key={c.id} className="mb-1">
                        <strong>{c.author}:</strong> {c.text}
                      </p>
                    ))}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleComment(
                          module.id,
                          e.target.comment.value.trim()
                        );
                        e.target.reset();
                      }}
                    >
                      <input
                        name="comment"
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Add a comment..."
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              background: "rgba(0,0,0,0.6)",
              zIndex: 1050,
            }}
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content rounded-4 overflow-hidden">
                {activeVideo.includes("youtube") ? (
                  <iframe
                    width="100%"
                    height="500"
                    src={convertToEmbedUrl(activeVideo)}
                    title="Training Video"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={activeVideo}
                    controls
                    autoPlay
                    style={{ width: "100%" }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
