// pages/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5001/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Product not found.');
                setLoading(false);
                console.error('Error fetching product details:', err);
            });
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const existingCartItemResponse = await axios.get(`http://localhost:5001/cartItems?productId=${product.id}`);
            const existingCartItem = existingCartItemResponse.data[0];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                    totalPrice: existingCartItem.totalPrice + product.price
                };
                await axios.patch(`http://localhost:5001/cartItems/${existingCartItem.id}`, updatedItem);
                setMessage(`Quantity of ${product.name} updated in cart!`);
            } else {
                const newCartItem = {
                    productId: product.id,
                    name: product.name,
                    image: product.image,
                    category: product.category,
                    originalPrice: product.price,
                    totalPrice: product.price,
                    quantity: 1
                };
                await axios.post("http://localhost:5001/cartItems", newCartItem);
                setMessage(`${product.name} added to cart!`);
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

    const handleBuyNow = () => {
        // Navigate to the checkout page, passing the product data in the state
        navigate('/checkout', { state: { product } });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            {message && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md z-50">
                    {message}
                </div>
            )}
            <div className="container mx-auto p-10 mt-16">
                <div className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="w-full md:w-1/2 p-4">
                        <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
                    </div>
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-xl text-gray-700 mb-4">{product.description}</p>
                        <p className="text-3xl font-bold text-red-600 mb-6">₹{product.price}</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;