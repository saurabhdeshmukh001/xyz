import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    const handleCategorySelect = (e) => {
      setSelectedCategory(e.detail);
    };
    window.addEventListener("categorySelected", handleCategorySelect);
    return () => window.removeEventListener("categorySelected", handleCategorySelect);
  }, []);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative h-screen w-full overflow-hidden">
        <Navbar></Navbar>
     
      <div className="relative flex flex-col items-center justify-start pt-20 min-h-screen z-10 w-full px-4">
        
        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div
            onClick={() => navigate("/manage-products")}
            className="cursor-pointer bg-black/40 backdrop-blur-md shadow-xl rounded-2xl p-8 text-white flex flex-col justify-center items-center hover:bg-blue-600 transition"
          >
            <h3 className="text-xl font-semibold mb-2">Product Management</h3>
            <p className="text-center text-gray-300">Add, edit, or remove products from your catalog.</p>
          </div>
          <div
            onClick={() => navigate("/manage-users")}
            className="cursor-pointer bg-black/40 backdrop-blur-md shadow-xl rounded-2xl p-8 text-white flex flex-col justify-center items-center hover:bg-green-600 transition"
          >
            <h3 className="text-xl font-semibold mb-2">User Profile Management</h3>
            <p className="text-center text-gray-300">Manage user accounts and permissions easily.</p>
          </div>
          <div
            onClick={() => navigate("/order-tracking")}
            className="cursor-pointer bg-black/40 backdrop-blur-md shadow-xl rounded-2xl p-8 text-white flex flex-col justify-center items-center hover:bg-purple-600 transition"
          >
            <h3 className="text-xl font-semibold mb-2">Order Tracking</h3>
            <p className="text-center text-gray-300">Track and update order statuses in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;