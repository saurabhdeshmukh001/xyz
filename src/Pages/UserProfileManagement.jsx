import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const UserProfileManagement = () => {
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => {
        const filteredUsers = data.filter(user => user.role === "customer");
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEdit = (id) => {
    alert(`Edit user with id: ${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        setSuccessMessage("User deleted successfully.");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 px-4 mt-10">
        {successMessage && (
          <div className="mb-4 w-full max-w-5xl bg-green-600 text-white p-3 rounded">
            {successMessage}
          </div>
        )}
        <h1 className="text-3xl font-bold text-white mb-6 mt-10">User Profile Management</h1>
        <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg w-full max-w-5xl p-6">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, role }) => (
                <tr key={id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="py-3 px-4">{name}</td>
                  <td className="py-3 px-4">{email}</td>
                  <td className="py-3 px-4">{role}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-1 px-3 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
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
    </>
  );
};

export default UserProfileManagement;
