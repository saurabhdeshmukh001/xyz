// pages/CheckoutPage.jsx (Enhanced Version)
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Keep if you use it

function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Default to an empty object if state is undefined
    const { product, cartItems, total } = location.state || {}; 

    const [address, setAddress] = useState('');
    const [paymentType, setPaymentType] = useState('Card');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // --- Price Calculation and Data Setup ---

    // Determine the items and total regardless of source (Cart or Buy Now)
    const itemsToDisplay = product ? [{ 
        ...product, 
        quantity: location.state?.quantity || 1, // Get quantity from state if available (from Buy Now)
        totalPrice: product.price * (location.state?.quantity || 1) 
    }] : cartItems;
    
    // Calculate final subtotal (Total is already passed for cart, but need to calculate for single product)
    const subTotal = total || (product ? product.price * (location.state?.quantity || 1) : 0);
    
    const SHIPPING_COST = subTotal > 5000 ? 0 : 250; // Example: Free shipping over ₹5000
    const finalTotal = subTotal + SHIPPING_COST;

    const itemsToOrder = (itemsToDisplay || []).map(item => ({
        productId: item.productId || item.id, // Use product.id for single product
        name: item.name,
        price: item.originalPrice || item.price, // originalPrice for cart, price for product
        quantity: item.quantity || 1,
        size: item.size || 'N/A' // Include size from cart/product details if available
    }));

    // useEffect to potentially load user's existing address (Mocking)
    useEffect(() => {
        // In a real app, you'd fetch the user's default address here
        // axios.get(`http://localhost:5001/users/1`).then(res => setAddress(res.data.address || ''));
    }, []);

    // --- Order Placement Handler ---

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!itemsToOrder.length) {
            setError('No items to order. Please go back and add items.');
            return;
        }
        if (!address.trim()) {
             setError('Please enter a valid shipping address.');
             return;
        }

        setLoading(true);
        setError('');

        try {
            const userId = "1"; // Simulating a logged-in user

            // 1. Update user's address (optional, based on your backend)
            await axios.patch(`http://localhost:5001/users/${userId}`, { address });

            // 2. Create the new order object
            const newOrder = {
                userId,
                products: itemsToOrder,
                totalPrice: finalTotal, // Use the calculated final total
                shippingAddress: address,
                paymentMethod: paymentType,
                status: 'Processing',
                orderDate: new Date().toISOString(),
                trackingNumber: `TRACK-${Math.floor(Math.random() * 1000000)}`
            };

            // 3. Post the new order
            const orderResponse = await axios.post("http://localhost:5001/orders", newOrder);
            const orderId = orderResponse.data.id;

            // 4. Clear the cart if the order was placed from the cart
            if (cartItems) {
                await Promise.all(cartItems.map(item => axios.delete(`http://localhost:5001/cartItems/${item.id}`)));
            }

            // 5. Navigate to confirmation page
            navigate(`/order-confirmation/${orderId}`, { state: { order: orderResponse.data } });

        } catch (err) {
            console.error("Error placing order:", err);
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    // --- Render Component ---

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-10 min-h-screen">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-900 border-b pb-4">
                    Secure Checkout 🔒
                </h1>
                
                {itemsToDisplay.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
                        <p className="text-xl text-gray-500 mb-4">No items found for checkout.</p>
                        <button
                            onClick={() => navigate('/')} 
                            className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
                        >
                            Back to Shop
                        </button>
                    </div>
                )}

                {itemsToDisplay.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* Shipping and Payment Form - Left/Main Column */}
                        <div className="lg:col-span-2 space-y-8">
                            <form onSubmit={handlePlaceOrder}>
                                {/* Shipping Section */}
                                <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
                                    <h2 className="text-2xl font-bold mb-6 text-black">1. Shipping Information 🚚</h2>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">Full Shipping Address</label>
                                        <textarea
                                            id="address"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
                                            rows="4"
                                            placeholder="House No, Street, City, State, Pincode"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <p className="text-sm text-gray-500">Your address will be securely saved for future orders.</p>
                                </div>
                                
                                {/* Payment Section */}
                                <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
                                    <h2 className="text-2xl font-bold mb-6 text-black">2. Payment Method 💳</h2>
                                    <div className="space-y-3">
                                        {['Credit/Debit Card', 'UPI', 'Cash on Delivery'].map((method) => (
                                            <label 
                                                key={method}
                                                className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                                                    paymentType === method ? 'border-black bg-gray-50 shadow-inner' : 'border-gray-300 hover:border-gray-500'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentType"
                                                    value={method}
                                                    checked={paymentType === method}
                                                    onChange={(e) => setPaymentType(e.target.value)}
                                                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                                                />
                                                <span className="ml-3 font-medium text-gray-800">{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-sm text-gray-500">All transactions are secured with industry-leading encryption.</p>
                                </div>
                                
                                {/* Error and Final Button */}
                                {error && <p className="text-red-500 text-center mt-6 font-semibold">{error}</p>}
                                
                                <button
                                    type="submit"
                                    className={`w-full text-white font-extrabold py-4 rounded-xl mt-8 text-xl transition duration-300 shadow-lg ${
                                        loading || !address.trim()
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-black hover:bg-gray-800'
                                    }`}
                                    disabled={loading || !address.trim()}
                                >
                                    {loading ? 'Processing Order...' : `Pay & Place Order for ₹${finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                                </button>
                                
                            </form>
                        </div>
                        
                        {/* Order Summary - Right/Sidebar Column */}
                        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow-lg h-fit sticky top-10">
                            <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-900">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {(itemsToDisplay || []).map((item, index) => (
                                    <div key={index} className="flex justify-between items-start border-b pb-2">
                                        <div className="flex flex-col text-sm text-gray-600">
                                            <span className="font-semibold">{item.name}</span>
                                            <span className="text-xs">
                                                {item.quantity ? `Qty: ${item.quantity}` : 'Qty: 1'} 
                                                {item.size && ` | Size: ${item.size}`}
                                            </span>
                                        </div>
                                        <span className="font-bold text-gray-800">
                                            ₹{(item.totalPrice || item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Price Breakdown */}
                            <div className="space-y-2 border-t pt-4">
                                <div className="flex justify-between text-base text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">₹{subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-base text-gray-700">
                                    <span>Shipping</span>
                                    <span className={`font-semibold ${SHIPPING_COST === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                        {SHIPPING_COST === 0 ? 'FREE' : `₹${SHIPPING_COST.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-2xl font-extrabold text-black border-t pt-3 mt-3">
                                    <span>Order Total</span>
                                    <span>₹{finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default CheckoutPage;