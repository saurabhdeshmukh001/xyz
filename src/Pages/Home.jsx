import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ProductCard from "./productCard";

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
      {/* The message display logic is now inside ProductCard, so we remove it here. */}
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;