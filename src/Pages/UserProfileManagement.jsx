import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate for potential future use

const UserProfileManagement = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5001/users")
      .then((response) => {
        const filteredUsers = response.data.filter(user => user.role === "customer");
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEdit = (id) => {
    // This is a placeholder. You could use navigate here to go to an edit page.
    alert(`Edit user with id: ${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        setSuccessMessage("User deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 2000); // 2-second timeout
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* The `Navbar` component should be outside the main content container */}
      {/* <Navbar /> */}

      <div className="relative flex flex-col items-center justify-start pt-20 min-h-screen z-10 w-full px-4">
        {/* Fixed success message alert */}
        {successMessage && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between space-x-4 animate-fade-in-down">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-white font-bold hover:text-gray-200"
            >
              &times;
            </button>
          </div>
        )}

        {/* Main Content Container with consistent styling */}
        <div className="w-full max-w-5xl bg-black/40 backdrop-blur-md shadow-xl rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-8 text-center">User Profile Management</h1>
          
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-black/50 border-b border-gray-700">
                  <th className="py-3 px-6 text-left font-semibold border-gray-700">Name</th>
                  <th className="py-3 px-6 text-left font-semibold border-gray-700">Email</th>
                  <th className="py-3 px-6 text-left font-semibold border-gray-700">Role</th>
                  <th className="py-3 px-6 text-left font-semibold border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(({ id, name, email, role }) => (
                  <tr key={id} className="bg-black/30 border-b border-gray-700 hover:bg-black/60 transition">
                    <td className="py-3 px-6 border-gray-700">{name}</td>
                    <td className="py-3 px-6 border-gray-700">{email}</td>
                    <td className="py-3 px-6 border-gray-700">{role}</td>
                    <td className="py-3 px-6 border-gray-700 space-x-2">
                      <button
                        onClick={() => handleEdit(id)}
                        className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600 text-black font-semibold transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-white font-semibold transition"
                      >
                        Delete
                      </button>
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
};

export default UserProfileManagement;