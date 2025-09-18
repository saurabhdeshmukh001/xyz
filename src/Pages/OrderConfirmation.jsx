// pages/OrderConfirmation.jsx
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function OrderConfirmation() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const location = useLocation();
    const { order } = location.state || {};

    if (!order) {
        return <div className="text-center mt-20">No order details found.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-10 mt-16 max-w-2xl text-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-green-500 text-6xl mb-4">✔</div>
                    <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
                    <p className="text-gray-600 mb-6">Your order has been confirmed and is being processed.</p>
                    
                    <div className="text-left bg-gray-100 p-6 rounded-lg mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                        <p className="mb-2"><strong>Order ID:</strong> {order.id}</p>
                        <p className="mb-2"><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                        <p className="mb-2"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                        <p className="mb-2"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        <p className="mb-2"><strong>Order Status:</strong> {order.status}</p>
                        <p className="mb-2"><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                    </div>

                    <button
                        onClick={() => navigate(`/order-tracking/${orderId}`, { state: { order } })}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Track My Order
                    </button>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
}

export default OrderConfirmation;