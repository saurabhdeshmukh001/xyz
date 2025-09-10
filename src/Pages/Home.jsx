import React from "react";
import Footer from "../components/Footer";

function Home() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High quality wireless headphones with noise cancellation.",
      image:
        "https://images.unsplash.com/photo-1512499617640-c2f99912e1d1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Stay connected and track your fitness with this smart watch.",
      image:
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Gaming Laptop",
      description: "Powerful gaming laptop with high-end graphics card.",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Wireless Speaker",
      description: "Portable wireless speaker with excellent sound quality.",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "DSLR Camera",
      description: "Capture stunning photos with this professional DSLR camera.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Fitness Tracker",
      description: "Monitor your daily activity and health metrics easily.",
      image:
        "https://images.unsplash.com/photo-1519861535920-1b5bf7b0d5f8?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 bg-opacity-90">
        <div className="text-xl font-bold">E-Shop</div>
        <div className="space-x-6">
          <a href="#categories" className="hover:text-gray-300">
            Categories
          </a>
          <a href="#cart" className="hover:text-gray-300">
            Cart
          </a>
          <a href="#profile" className="hover:text-gray-300">
            Profile
          </a>
        </div>
      </nav>

      <main className="flex-grow p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-300 text-sm">{product.description}</p>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default Home;