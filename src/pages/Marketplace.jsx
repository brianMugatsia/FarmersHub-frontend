import React, { useState } from "react";
import "./Marketplace.css";
import tomatoes from "../assets/tomatoes.png";
import maize from "../assets/maize.png";
import honey from "../assets/honey.png";
import cow from "../assets/cow.png";
import tractor from "../assets/tractor.png";
import milk from "../assets/milk.png";
import farmersicon from "../assets/farmersicon.png";

//  Import Lucide icons
import {
  ShoppingCart,
  Upload,
  Search,
  Package,
  MapPin,
  User,
  MessageCircle,
  X,
} from "lucide-react";

const sampleProducts = [
  {
    id: 1,
    name: "Fresh Maize",
    price: "KSh 80 / kg",
    location: "Kisumu",
    category: "Crops",
    image: maize,
    seller: "Farmer Otieno",
    whatsapp: "+254712345678",
  },
  {
    id: 2,
    name: "Organic Tomatoes",
    price: "KSh 150 / kg",
    location: "Nakuru",
    category: "Crops",
    image: tomatoes,
    seller: "Farmer Wanjiku",
    whatsapp: "+254701234567",
  },
  {
    id: 3,
    name: "Local Honey",
    price: "KSh 500 / jar",
    location: "Kericho",
    category: "Animal Products",
    image: honey,
    seller: "Bee Keeper Kiptoo",
    whatsapp: "+254711987654",
  },
  {
    id: 4,
    name: "Dairy Cow",
    price: "KSh 65,000",
    location: "Eldoret",
    category: "Livestock",
    image: cow,
    seller: "Farmer Cherono",
    whatsapp: "+254701112233",
  },
  {
    id: 5,
    name: "Tractor Attachment",
    price: "KSh 1,500,000",
    location: "Nairobi",
    category: "Equipment",
    image: tractor,
    seller: "Machinery Hub",
    whatsapp: "+254722223344",
  },
  {
    id: 6,
    name: "Fresh Milk",
    price: "KSh 300 / litre",
    location: "Kakamega",
    category: "Animal Products",
    image: milk,
    seller: "Dairy Farmer Akinyi",
    whatsapp: "+254733445566",
  },
];

export default function Marketplace() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState(sampleProducts);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    location: "",
    category: "Crops",
    image: "",
    seller: "",
    whatsapp: "",
  });
  const [preview, setPreview] = useState(null);

  const categories = ["All", "Crops", "Livestock", "Equipment", "Animal Products"];

  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  const addToCart = (product, qty = 1) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.seller) return;
    const newId = products.length + 1;
    setProducts([...products, { ...newProduct, id: newId, image: preview || maize }]);
    setNewProduct({
      name: "",
      price: "",
      location: "",
      category: "Crops",
      image: "",
      seller: "",
      whatsapp: "",
    });
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const totalCost = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <div className="container-fluid py-5">
      <h2 className="text-center mb-4 text-success fw-bold d-flex justify-content-center align-items-center gap-2">
        <img
          src={farmersicon}
          alt="Farmers Hub Icon"
          className="spinning-icon"
          style={{
            height: "100px",
            width: "100px",
            objectFit: "contain",
            borderRadius: "50px",
          }}
        />
        Farmers Marketplace
      </h2>

      {/* Seller Upload Section */}
      <div
        className="card shadow-sm mb-4 p-4 bg-light border-0 rounded-4 mx-auto"
        style={{ width: "90%", maxWidth: "1200px" }}
      >
        <h5 className="text-success fw-bold mb-3 d-flex align-items-center gap-2">
          <ShoppingCart size={20} /> Post Your Product
        </h5>
        <form onSubmit={handleUpload}>
          <div className="row g-3">
            <div className="col-md-4 col-lg-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4 col-lg-2">
              <input
                type="text"
                className="form-control"
                placeholder="Price (KSh)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4 col-lg-2">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={newProduct.location}
                onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
              />
            </div>
            <div className="col-md-4 col-lg-2">
              <select
                className="form-select"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c}>{c}</option>
                  ))}
              </select>
            </div>
            <div className="col-md-4 col-lg-3">
              <input
                type="text"
                className="form-control"
                placeholder="Seller Name"
                value={newProduct.seller}
                onChange={(e) => setNewProduct({ ...newProduct, seller: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <input
                type="text"
                className="form-control"
                placeholder="WhatsApp Number"
                value={newProduct.whatsapp}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, whatsapp: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            {preview && (
              <div className="col-md-4 col-lg-2 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ height: "70px", objectFit: "cover" }}
                />
              </div>
            )}
            <div className="col-md-4 col-lg-2">
              <button type="submit" className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2">
                <Upload size={18} /> Upload
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 🔍 Search + Filter Row */}
      <div className="row justify-content-center align-items-center mb-4">
        <div className="col-md-4 mb-2">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-success text-white">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-success text-white">
              <Package size={18} />
            </span>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 🧾 Product Grid */}
      <div className="row">
        {filtered.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0 rounded-4">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top rounded-top-4"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-success fw-bold">{product.name}</h5>
                <p className="card-text mb-1">{product.price}</p>
                <p className="text-muted small mb-2 d-flex align-items-center gap-1">
                  <MapPin size={14} /> {product.location}
                </p>
                <p className="text-muted small d-flex align-items-center gap-1">
                  <User size={14} /> {product.seller}
                </p>
                <span className="badge bg-success mb-3">{product.category}</span>

                <div className="d-flex align-items-center mb-2">
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="form-control form-control-sm me-2"
                    style={{ width: "70px" }}
                    id={`qty-${product.id}`}
                  />
                  <button
                    className="btn btn-outline-success btn-sm flex-grow-1"
                    onClick={() =>
                      addToCart(
                        product,
                        parseInt(document.getElementById(`qty-${product.id}`).value || 1)
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  className="btn btn-success btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={() =>
                    (window.location.href = `https://wa.me/${product.whatsapp.replace(
                      "+",
                      ""
                    )}?text=Hi ${product.seller}, I'm interested in your ${product.name}.`)
                  }
                >
                  <MessageCircle size={16} /> Contact Seller
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-muted">No products found.</p>
        )}
      </div>

      {/* 🛍️ Floating Cart Button + Slide-Out Panel */}
      {cart.length > 0 && (
        <>
          <button
            className="btn btn-success cart-toggle-btn shadow d-flex align-items-center gap-2"
            onClick={() => setShowCart(!showCart)}
          >
            <ShoppingCart size={18} /> View Cart ({cart.length})
          </button>

          <div className={`cart-panel ${showCart ? "open" : ""}`}>
            <div className="cart-header d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-success fw-bold d-flex align-items-center gap-2">
                <ShoppingCart size={18} /> Your Cart
              </h5>
              <button
                className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                onClick={() => setShowCart(false)}
              >
                <X size={14} /> Close
              </button>
            </div>

            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom py-2 flex-wrap"
              >
                <div className="mb-2">
                  <strong>{item.name}</strong> × {item.quantity} — {item.price}
                  <br />
                  <small className="text-muted d-flex align-items-center gap-1">
                    <User size={12} /> {item.seller}
                  </small>
                </div>

                <div className="d-flex gap-2 flex-wrap cart-actions">
                  <a
                    href={`https://wa.me/${item.whatsapp.replace(
                      "+",
                      ""
                    )}?text=Hi ${item.seller}, I'm buying ${item.quantity} x ${item.name} (${item.price}).`}
                    className="btn btn-sm btn-success d-flex align-items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-end mt-3 cart-total">
              <h6 className="fw-bold text-success">
                Total: KSh {totalCost.toLocaleString()}
              </h6>
              <button className="btn btn-success mt-2 px-4 w-100">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
