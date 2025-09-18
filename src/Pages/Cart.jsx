// pages/Cart.jsx (Enhanced Version)
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import axios from "axios";
// Import icons for quantity control (assuming you have a library like react-icons)
// If you don't use react-icons, you can replace these with simple '+' and '-'
// import { FiPlus, FiMinus, FiTrash } from 'react-icons/fi';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // --- Utility Functions ---

  // Fetches cart items from the server
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5001/cartItems");
        // Ensure data has the necessary price/quantity keys for calculation
        setCartItems(response.data); 
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  // Recalculates total whenever cartItems change
  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotal(newTotal);
  }, [cartItems]);


  // --- Cart Modification Handlers ---

  const updateCartItemQuantity = async (id, newQuantity) => {
    const itemToUpdate = cartItems.find(item => item.id === id);
    if (!itemToUpdate || newQuantity < 1) return;

    try {
      const newTotalPrice = itemToUpdate.originalPrice * newQuantity;

      await axios.patch(`http://localhost:5001/cartItems/${id}`, {
        quantity: newQuantity,
        totalPrice: newTotalPrice,
      });

      // Update state to reflect the change
      setCartItems(
        cartItems.map(item =>
          item.id === id
            ? { ...item, quantity: newQuantity, totalPrice: newTotalPrice }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleIncrement = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateCartItemQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrement = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      // If quantity is 1, a decrement should trigger a full removal
      if (item.quantity === 1) {
        handleRemoveFromCart(id);
      } else {
        updateCartItemQuantity(id, item.quantity - 1);
      }
    }
  };

  const handleRemoveFromCart = async (idToRemove) => {
    try {
      // Always perform a full delete operation since decrement handles quantity > 1
      await axios.delete(`http://localhost:5001/cartItems/${idToRemove}`);

      // Update state by filtering out the removed item
      setCartItems(cartItems.filter(item => item.id !== idToRemove));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };


  // --- Order/Checkout Handler ---

  const handlePlaceOrder = () => {
    // Navigate to the checkout page, passing all cart items and the total
    if (cartItems.length > 0) {
      navigate('/checkout', { state: { cartItems, total } });
    }
  };


  // --- Component Render ---

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-10">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 border-b pb-4">
          Shopping Cart 🛒
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
            <p className="text-xl text-gray-500 mb-4">Your cart is empty. Time to find some fresh kicks!</p>
            <button
              onClick={() => navigate('/')} // Assuming '/' is your home/shop page
              className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Items List - Left/Main Column */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Items in Cart ({cartItems.length})</h2>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-xl shadow-md p-4 transition duration-300 hover:shadow-lg"
                >
                  {/* Image Section */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 sm:h-24 sm:w-24 object-cover rounded-lg mr-4 flex-shrink-0"
                  />

                  {/* Details Section */}
                  <div className="flex-grow my-4 sm:my-0">
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Category: {item.category}</p>
                    <p className="text-md font-semibold mt-1">
                      Unit Price: ₹{item.originalPrice}
                    </p>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center space-x-2 border rounded-lg p-1 mx-4">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="text-gray-600 hover:text-black p-1 transition"
                    >
                      {/* <FiMinus size={18} /> */} - 
                    </button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="text-gray-600 hover:text-black p-1 transition"
                    >
                      {/* <FiPlus size={18} /> */} +
                    </button>
                  </div>

                  {/* Subtotal and Remove */}
                  <div className="flex flex-col items-end space-y-2 mt-4 sm:mt-0">
                    <p className="text-xl font-extrabold text-red-600">₹{item.totalPrice}</p>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-sm text-red-500 hover:text-red-700 font-medium transition flex items-center"
                    >
                      {/* <FiTrash className="mr-1" /> */} Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>


            {/* Order Summary - Right/Sidebar Column */}
            <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow-lg h-fit sticky top-10">
              <h2 className="text-2xl font-bold mb-6 border-b pb-3">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-lg text-gray-600">
                  <span>Shipping Estimate</span>
                  <span className="font-semibold">₹0.00 (Free)</span>
                </div>
                
                <div className="flex justify-between text-lg text-gray-600 border-t pt-4">
                  <span>Tax Estimate (Included)</span>
                  <span className="font-semibold">₹0.00</span>
                </div>

                <div className="flex justify-between text-2xl font-extrabold text-gray-900 border-t border-b py-4">
                  <span>Order Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className={`w-full text-white font-bold py-3 rounded-xl mt-6 transition duration-300 ${
                  cartItems.length > 0 
                    ? 'bg-black hover:bg-gray-800' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Place Order at ₹{total.toFixed(2)}
              </button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;