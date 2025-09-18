// pages/OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function OrderTracking() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // Fetch the order from db.json using the orderId from the URL
                const response = await axios.get(`http://localhost:5001/orders/${orderId}`);
                setOrder(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching order details:", err);
                setError('Order not found or an error occurred.');
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return <div className="text-center mt-20">Loading order details...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    }

    const trackingSteps = [
        { status: 'Confirmed', isComplete: true },
        { status: 'Processing', isComplete: order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' },
        { status: 'Shipped', isComplete: order.status === 'Shipped' || order.status === 'Delivered' },
        { status: 'Delivered', isComplete: order.status === 'Delivered' },
    ];

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-10 mt-16 max-w-2xl text-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6">Order Tracking</h1>
                    <p className="mb-4"><strong>Order ID:</strong> {order.id}</p>
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
            <Footer />
        </div>
    );
}

export default OrderTracking;