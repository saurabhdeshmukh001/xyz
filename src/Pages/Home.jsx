// pages/Home.jsx (Beautified Version)
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ProductCard from "./productCard";
import Carousel from "../components/Carousel"; 
// Assuming ProductCard is available in the current directory or imported correctly

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5001/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    useEffect(() => {
        const handleCategorySelect = (e) => {
            setSelectedCategory(e.detail);
        };
        // This is a custom event listener that relies on Navbar dispatching an event
        window.addEventListener("categorySelected", handleCategorySelect);
        return () => window.removeEventListener("categorySelected", handleCategorySelect);
    }, []);

    const filteredProducts =
        selectedCategory && selectedCategory !== "All"
            ? products.filter((p) => p.category === selectedCategory)
            : products;

    // --- New Section: Banner Component (Inline for Simplicity) ---
    const PromotionBanner = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center bg-gray-900 text-white my-10 rounded-xl shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
                Grab Your Exclusive Sneako Gear
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Limited-time offers on lifestyle wear and accessories. Don't miss out on fresh street style.
            </p>
            <button
                onClick={() => navigate('/accessories')} // Assuming an accessories route exists
                className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
            >
                Explore Promotions
            </button>
        </div>
    );
    // -----------------------------------------------------------------


    const ProductGridHeader = () => {
        const title = selectedCategory && selectedCategory !== "All"
            ? `${selectedCategory} Collection`
            : "Fresh Drops & Bestsellers";

        const subtitle = selectedCategory && selectedCategory !== "All"
            ? `Showing ${filteredProducts.length} items.`
            : "Check out the newest and most popular sneakers on Sneako.";
            
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8 border-b-2 pb-4">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
                    {title}
                </h1>
                <p className="text-lg text-gray-600">
                    {subtitle}
                </p>
            </div>
        );
    };


    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            
            {/* 1. Main Carousel Section */}
            <Carousel /> 

            {/* 2. Promotional Banner Section */}
            <PromotionBanner />
            
            {/* 3. Product Grid Header */}
            <ProductGridHeader />

            {/* 4. Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-gray-500">
                            No products found in the selected category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer component would typically go here */}
            {/* Assuming Footer is not included here as it wasn't in your original Home.jsx */}
        </div>
    );
}

export default Home;