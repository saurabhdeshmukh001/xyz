// pages/Admin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// Import admin components
import ProductManagement from "./ProductManagement";
import UserProfileManagement from "./UserProfileManagement";
import AdminOverview from "./AdminOverview";
import OrderTrackingAdmin from "./OrderTrackingAdmin"; // Import the new component

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  // Authentication check (optional, but good practice)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'seller') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      <Navbar />

      <div className="pt-20 px-4 md:px-8 lg:px-12 pb-8">
        {/* Tab Navigation */}
        <div className="bg-white p-2 rounded-lg shadow-md flex justify-around mb-8 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab("Overview")}
            className={`py-2 px-6 rounded-md font-medium text-lg transition-all duration-300 ${
              activeTab === "Overview" ? "bg-blue-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("Products")}
            className={`py-2 px-6 rounded-md font-medium text-lg transition-all duration-300 ${
              activeTab === "Products" ? "bg-blue-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("Orders")}
            className={`py-2 px-6 rounded-md font-medium text-lg transition-all duration-300 ${
              activeTab === "Orders" ? "bg-blue-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("Customers")}
            className={`py-2 px-6 rounded-md font-medium text-lg transition-all duration-300 ${
              activeTab === "Customers" ? "bg-blue-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Customers
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "Overview" && <AdminOverview />}
          {activeTab === "Products" && <ProductManagement />}
          {activeTab === "Orders" && <OrderTrackingAdmin />} {/* Render the new component here */}
          {activeTab === "Customers" && <UserProfileManagement />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;