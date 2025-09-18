// pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    // Get either a single product or the cart items from the state
    const { product, cartItems, total } = location.state || {}; 

    const [address, setAddress] = useState('');
    const [paymentType, setPaymentType] = useState('Card');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const itemsToOrder = product ? [{
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        }] : cartItems.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.originalPrice,
            quantity: item.quantity
        }));

        const orderTotal = product ? product.price : total;

        if (!itemsToOrder.length) {
            setError('No items to order. Please go back and add items.');
            setLoading(false);
            return;
        }

        try {
            const userId = "1"; // Simulating a logged-in user

            // Update user's address in the database
            await axios.patch(`http://localhost:5001/users/${userId}`, { address });

            const newOrder = {
                userId,
                products: itemsToOrder,
                totalPrice: orderTotal,
                shippingAddress: address,
                paymentMethod: paymentType,
                status: 'Processing',
                orderDate: new Date().toISOString(),
                trackingNumber: `TRACK-${Math.floor(Math.random() * 1000000)}`
            };

            const orderResponse = await axios.post("http://localhost:5001/orders", newOrder);
            const orderId = orderResponse.data.id;

            // Clear the cart if the order was placed from the cart
            if (cartItems) {
                await Promise.all(cartItems.map(item => axios.delete(`http://localhost:5001/cartItems/${item.id}`)));
            }

            navigate(`/order-confirmation/${orderId}`, { state: { order: orderResponse.data } });

        } catch (err) {
            console.error("Error placing order:", err);
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    // Determine the items to display based on whether a single product or cart items were passed
    const itemsToDisplay = product ? [product] : cartItems;

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-10 mt-16 max-w-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    {itemsToDisplay && itemsToDisplay.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <span>{item.name} {item.quantity ? `(x${item.quantity})` : ''}</span>
                            <span className="font-bold">₹{item.totalPrice || item.price}</span>
                        </div>
                    ))}
                    <hr className="my-4" />
                    <div className="flex justify-between items-center mb-4 font-bold text-lg">
                         <span>Total</span>
                         <span>₹{total || (product ? product.price : 0)}</span>
                    </div>

                    <form onSubmit={handlePlaceOrder}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">Shipping Address</label>
                            <textarea
                                id="address"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                rows="4"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="payment">Payment Method</label>
                            <select
                                id="payment"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                                required
                            >
                                <option value="Card">Credit/Debit Card</option>
                                <option value="UPI">UPI</option>
                                <option value="COD">Cash on Delivery</option>
                            </select>
                        </div>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? 'Placing Order...' : `Place Order for ₹${total || (product ? product.price : 0)}`}
                        </button>
                    </form>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
}

export default CheckoutPage;