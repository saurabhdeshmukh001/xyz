// pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from "../components/Navbar";
import axios from "axios";

function Cart() {
  const navigate = useNavigate(); // Initialize navigate
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch cart items from the server
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5001/cartItems");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    // Recalculate total whenever cartItems change
    const newTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handleRemoveFromCart = async (idToRemove) => {
    const itemToRemove = cartItems.find(item => item.id === idToRemove);
    if (!itemToRemove) {
      return;
    }

    try {
      if (itemToRemove.quantity > 1) {
        // Decrease quantity and update totalPrice
        const newQuantity = itemToRemove.quantity - 1;
        const newTotalPrice = itemToRemove.totalPrice - itemToRemove.originalPrice;

        await axios.patch(`http://localhost:5001/cartItems/${idToRemove}`, {
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        });

        // Update state to reflect the change
        setCartItems(
          cartItems.map(item =>
            item.id === idToRemove
              ? { ...item, quantity: newQuantity, totalPrice: newTotalPrice }
              : item
          )
        );
      } else {
        // Remove item from the server if quantity is 1
        await axios.delete(`http://localhost:5001/cartItems/${idToRemove}`);

        // Update state by filtering out the removed item
        setCartItems(cartItems.filter(item => item.id !== idToRemove));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handlePlaceOrder = () => {
    // Navigate to the checkout page, passing all cart items and the total
    navigate('/checkout', { state: { cartItems, total } });
  };

  return (
    <div>
      <Navbar />
      <div className="p-10 mt-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-lg bg-white overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-red-600 font-bold">₹{item.totalPrice}</p>
                  <p className="text-sm text-gray-600">Category: {item.category}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">Total: ₹{total}</h2>
            <button 
              onClick={handlePlaceOrder}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Place order at ₹{total}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;