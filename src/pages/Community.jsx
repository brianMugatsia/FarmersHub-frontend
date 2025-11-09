import React, { useState } from "react";
import { Handshake, Sprout, Users } from "lucide-react";
import "./Community.css";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [newPost, setNewPost] = useState({
    author: "",
    content: "",
    category: "General",
    type: "Announcement",
    image: "",
  });

  // Categories for filtering
  const categories = ["All", "Crops", "Livestock", "Soil", "Equipment", "Tips"];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.author || !newPost.content) return;

    const post = {
      ...newPost,
      id: Date.now(),
      likes: 0,
      comments: [],
      shares: 0,
    };
    setPosts([post, ...posts]);
    setNewPost({
      author: "",
      content: "",
      category: "General",
      type: "Announcement",
      image: "",
    });
  };

  const handleLike = (id) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleShare = (id) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, shares: p.shares + 1 } : p)));
  };

  const handleComment = (id, text) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, { text, id: Date.now() }] }
          : p
      )
    );
  };

  const filteredPosts = posts
    .filter((p) => filter === "All" || (p.category || "General") === filter)
    .filter((p) =>
      search ? p.content.toLowerCase().includes(search.toLowerCase()) : true
    )
    .sort((a, b) => {
      if (sort === "Most Liked") return b.likes - a.likes;
      if (sort === "Trending") return b.shares - a.shares;
      return b.id - a.id;
    });

  return (
    <div className="container py-5">
      {/* Centered Title */}
      <h2 className="text-center text-success fw-bold mb-4 d-flex justify-content-center align-items-center gap-2">
         <Users size={30} className="text-success" /> Farmers Community
      </h2>

      {/* Post Creation */}
      <form onSubmit={handlePostSubmit} className="card mb-2 shadow-sm p-4 mb-5rounded-4 mx-auto" style={{width:"90%", maxWidth:"1200px"}}>
        <h5 className="fw-bold text-success mb-3">Create a Post</h5>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Your Name"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Share your update, question, or announcement..."
          rows="3"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <div className="row mb-3">
          <div className="col-md-6">
            <select
              className="form-select"
              value={newPost.category}
              onChange={(e) =>
                setNewPost({ ...newPost, category: e.target.value })
              }
            >
              <option value="General">General</option>
              <option value="Crops">Crops</option>
              <option value="Livestock">Livestock</option>
              <option value="Soil">Soil</option>
              <option value="Equipment">Equipment</option>
              <option value="Tips">Tips</option>
            </select>
          </div>
          <div className="col-md-6">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  image: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          </div>
        </div>
        <button className="btn btn-success w-100">Post</button>
      </form>

      {/* Search & Sort */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search posts..."
          className="form-control w-auto flex-grow-1  p-45%"
          style={{ minwidth:"50px", maxWidth:"200px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-auto"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option>Newest</option>
          <option>Most Liked</option>
          <option>Trending</option>
        </select>
      </div>

      {/* Category Filter Buttons */}
      <div className="mb-4 d-flex flex-wrap justify-content-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${
              filter === cat ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-muted">
          No posts yet. Be the first to share!
        </p>
      ) : (
        filteredPosts.map((p) => (
          <div key={p.id} className="card shadow-sm p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong className="text-success">{p.author}</strong>
              <small className="text-muted">{p.category}</small>
            </div>
            <p>{p.content}</p>
            {p.image && (
              <img
                src={p.image}
                alt="Post"
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}
            <div className="d-flex gap-3">
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => handleLike(p.id)}
              >
                 {p.likes}
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleShare(p.id)}
              >
                 {p.shares}
              </button>
            </div>
            <div className="mt-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const comment = e.target.comment.value.trim();
                  if (comment) handleComment(p.id, comment);
                  e.target.reset();
                }}
              >
                <input
                  name="comment"
                  type="text"
                  placeholder="Add a comment..."
                  className="form-control mb-2"
                />
              </form>
              {p.comments.length > 0 && (
                <div className="mt-2">
                  {p.comments.map((c) => (
                    <p key={c.id} className="mb-1">
                       {c.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
