// pages/OrderTracking.jsx
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function OrderTracking() {
    const { orderId } = useParams();
    const location = useLocation();
    const { order } = location.state || {};
    
    // In a real application, you would fetch the latest order status from the server
    // For this simulation, we'll use the data passed from the confirmation page.

    if (!order) {
        return <div className="text-center mt-20">No order details found.</div>;
    }

    const trackingSteps = [
        { status: 'Confirmed', date: order.orderDate, isComplete: true },
        { status: 'Processing', date: '...', isComplete: order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' },
        { status: 'Shipped', date: '...', isComplete: order.status === 'Shipped' || order.status === 'Delivered' },
        { status: 'Delivered', date: '...', isComplete: order.status === 'Delivered' },
    ];

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-10 mt-16 max-w-2xl text-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6">Order Tracking</h1>
                    <p className="mb-4"><strong>Order ID:</strong> {orderId}</p>
                    <p className="mb-6"><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                    
                    <div className="flex justify-between items-center relative my-8">
                        {/* Tracking line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 z-0"></div>
                        
                        {trackingSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-500 ${step.isComplete ? 'bg-green-500' : 'bg-gray-400'}`}>
                                    {step.isComplete ? '✔' : index + 1}
                                </div>
                                <span className="mt-2 text-sm text-center">{step.status}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-left mt-8">
                        <p className="text-lg">Current Status: <span className="font-semibold text-blue-600">{order.status}</span></p>
                        <p className="mt-2 text-sm text-gray-500">
                            You will receive an email confirmation once the order ships.
                        </p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default OrderTracking;