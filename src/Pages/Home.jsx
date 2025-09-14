import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    const handleCategorySelect = (e) => {
      setSelectedCategory(e.detail);
    };
    window.addEventListener("categorySelected", handleCategorySelect);
    return () => window.removeEventListener("categorySelected", handleCategorySelect);
  }, []);

  const filteredProducts =
    selectedCategory && selectedCategory !== "All"
      ? products.filter((p) => p.category === selectedCategory)
      : products;

  return (
    <div>
      <Navbar />
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg bg-white overflow-hidden hover:scale-105 transition transform duration-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold text-red-600">₹{product.price}</p>
              <p className="text-xs text-gray-500 mt-1">Category: {product.category}</p>
              <button
                onClick={() => {
                  const storedCart = localStorage.getItem("cart");
                  const cart = storedCart ? JSON.parse(storedCart) : [];
                  cart.push(product);
                  localStorage.setItem("cart", JSON.stringify(cart));
                }}
                className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;