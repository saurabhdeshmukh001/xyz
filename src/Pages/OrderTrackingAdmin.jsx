// components/OrderTrackingAdmin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderTrackingAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      try {
        const ordersResponse = await axios.get("http://localhost:5001/orders");
        const usersResponse = await axios.get("http://localhost:5001/users");
        
        const ordersData = ordersResponse.data;
        const usersData = usersResponse.data;

        // Map through orders and attach the corresponding user object
        const ordersWithUsers = ordersData.map(order => {
          const user = usersData.find(u => u.id === order.userId);
          return { ...order, user };
        });

        setOrders(ordersWithUsers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch order or user data.");
        setLoading(false);
      }
    };

    fetchOrdersAndUsers();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5001/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update order status.");
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-700">No orders have been placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
                  <p className="text-gray-600">Customer: <span className="font-medium">{order.user ? order.user.name : 'N/A'}</span></p>
                  <p className="text-gray-600">Email: <span className="font-medium">{order.user ? order.user.email : 'N/A'}</span></p>
                  <p className="text-gray-600">Order Date: <span className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</span></p>
                  <p className="text-gray-600">Total Price: <span className="font-medium">₹{order.totalPrice}</span></p>
                  <p className="text-gray-600">Address: <span className="font-medium">{order.shippingAddress}</span></p>
                </div>
                <div>
                  <p className="font-bold">Products:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {order.products.map((product, index) => (
                      <li key={index}>{product.name} (x{product.quantity}) - ₹{product.price * product.quantity}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex items-center space-x-4">
                <label htmlFor={`status-${order.id}`} className="font-semibold">Update Status:</label>
                <select
                  id={`status-${order.id}`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="p-2 border rounded-md"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderTrackingAdmin;