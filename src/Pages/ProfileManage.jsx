import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
// ProfileInformation is the new component containing the form and view
import ProfileInformation from "./ProfileInformation"

function Profile() {
  const [activeTab, setActiveTab] = useState("Profile");
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="pt-20 px-4 md:px-8 lg:px-12 pb-8 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="bg-white p-2 rounded-lg shadow-md flex justify-around mb-8">
            <button
              onClick={() => setActiveTab("Profile")}
              className={`py-2 px-6 rounded-md font-medium text-lg transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "Profile" ? "bg-blue-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("Orders")}
              className={`py-2 px-6 rounded-md font-medium text-lg transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "Orders" ? "bg-blue-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>Orders</span>
            </button>
            <button
              onClick={() => setActiveTab("Addresses")}
              className={`py-2 px-6 rounded-md font-medium text-lg transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "Addresses" ? "bg-blue-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>Addresses</span>
            </button>
            <button
              onClick={() => setActiveTab("Payment")}
              className={`py-2 px-6 rounded-md font-medium text-lg transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "Payment" ? "bg-blue-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>Payment</span>
            </button>
          </div>

          {/* Content based on active tab */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            {activeTab === "Profile" && <ProfileInformation />}
            {activeTab === "Orders" && (
              <div className="text-center p-10">
                <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
                <p className="text-gray-700">Order history will be displayed here.</p>
              </div>
            )}
            {activeTab === "Addresses" && (
              <div className="text-center p-10">
                <h2 className="text-2xl font-semibold mb-4">Your Addresses</h2>
                <p className="text-gray-700">Manage your shipping and billing addresses.</p>
              </div>
            )}
            {activeTab === "Payment" && (
              <div className="text-center p-10">
                <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
                <p className="text-gray-700">Manage your saved payment methods.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;