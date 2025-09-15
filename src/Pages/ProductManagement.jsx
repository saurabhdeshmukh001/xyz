import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5001/products")
      .then((res) => {
        const productsWithId = res.data.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          ...product
        }));
        setProducts(productsWithId);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = async (id, name) => {
    console.log("Delete button clicked for id:", id);
    try {
      const productToDelete = products.find(p => String(p.id) === String(id));
      console.log("Product found in state for deletion:", productToDelete);
      if (!productToDelete) {
        console.error("Product not found for deletion");
        return;
      }
      const deleteUrl = `http://localhost:5001/products/${String(productToDelete.id)}`;
      console.log("Deletion URL:", deleteUrl, "Type of ID:", typeof productToDelete.id);
      await axios.delete(deleteUrl);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(productToDelete.id)));
      setSuccessMessage(`${name} deleted successfully!`);
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting product:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />
      <div className="relative flex flex-col items-center justify-start pt-20 min-h-screen z-10 w-full px-4">
        <div className="w-full max-w-5xl bg-black/40 backdrop-blur-md shadow-xl rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-8 text-center">Product Management</h1>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate('/add-product')}
              className="px-5 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white font-semibold transition"
            >
              Add New Product
            </button>
          </div>
          {successMessage && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between space-x-4">
              <span>{successMessage}</span>
              <button
                onClick={() => setSuccessMessage("")}
                className="text-white font-bold hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          )}
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-black/50 border-b border-gray-700">
                  <th className="py-3 px-6 text-left font-semibold border-gray-700">Name</th>
                  <th className="py-3 px-6 text-left font-semibold border-gray-700">Category</th>
                  <th className="py-3 px-6 text-left font-semibold border-gray-700">Price</th>
                  <th className="py-3 px-6 text-left font-semibold border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr
                    key={product.id}
                    className="bg-black/30 border-b border-gray-700 hover:bg-black/60 transition"
                  >
                    <td className="py-3 px-6 border-gray-700">{product.name}</td>
                    <td className="py-3 px-6 border-gray-700">{product.category}</td>
                    <td className="py-3 px-6 border-gray-700">₹{product.price}</td>
                    <td className="py-3 px-6 border-gray-700 space-x-2">
                      <button
                        className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600 text-white font-semibold transition"
                        onClick={() => navigate(`/edit-product/${product.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-white font-semibold transition"
                        onClick={() => handleDelete(product.id, product.name)}
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

export default ProductManagement;
