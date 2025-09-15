import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState('');

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

  const handleAddToCart = async (productToAdd) => {
    try {
      // Check if the item already exists in the cart on the server
      const existingCartItemResponse = await axios.get(`http://localhost:5001/cartItems?productId=${productToAdd.id}`);
      const existingCartItem = existingCartItemResponse.data[0];

      if (existingCartItem) {
        // Item exists, so update its quantity and total price
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
          totalPrice: existingCartItem.totalPrice + productToAdd.price // Use productToAdd.price for the unit price
        };
        await axios.patch(`http://localhost:5001/cartItems/${existingCartItem.id}`, updatedItem);
        setMessage(`Quantity of ${productToAdd.name} updated in cart!`);
      } else {
        // Item is new, so add it to the cart
        const newCartItem = {
          productId: productToAdd.id,
          name: productToAdd.name,
          image: productToAdd.image,
          category: productToAdd.category,
          originalPrice: productToAdd.price, // Store the unit price
          totalPrice: productToAdd.price, // Initial total price is the unit price
          quantity: 1
        };
        await axios.post("http://localhost:5001/cartItems", newCartItem);
        setMessage(`${productToAdd.name} added to cart!`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage("Failed to add item to cart.");
    } finally {
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  const filteredProducts =
    selectedCategory && selectedCategory !== "All"
      ? products.filter((p) => p.category === selectedCategory)
      : products;

  return (
    <div>
      <Navbar />
      {message && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md z-50">
          {message}
        </div>
      )}
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
                onClick={() => handleAddToCart(product)}
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