

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
                  <p className="text-red-600 font-bold">₹{item.price}</p>
                  <p className="text-sm text-gray-600">Category: {item.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">Total: ₹{total}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;