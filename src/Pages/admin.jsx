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
     
      <div className="relative flex flex-col items-center justify-start pt-20 min-h-screen z-10">
        
        {/* Product Management Section */}
        <div className="w-full max-w-4xl bg-black/40 backdrop-blur-md shadow-xl rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Manage Products</h2>
            <button
              onClick={() => navigate("/add-product")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Add New Product
            </button>
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full border border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700 text-left">Name</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-left">Category</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-left">Price</th>
                  <th className="px-4 py-2 border-b border-gray-700 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-700 transition">
                    <td className="px-4 py-2 border-b border-gray-700">{product.name}</td>
                    <td className="px-4 py-2 border-b border-gray-700">{product.category}</td>
                    <td className="px-4 py-2 border-b border-gray-700">₹{product.price}</td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      <button className="bg-yellow-500 text-black font-semibold px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition">Edit</button>
                      <button className="bg-red-600 text-white font-semibold px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;