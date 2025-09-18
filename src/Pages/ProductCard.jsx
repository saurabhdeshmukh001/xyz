import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to use 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div
      key={product.id}
      className="border rounded-lg shadow-lg bg-white overflow-hidden hover:scale-105 transition transform duration-200"
    >
      {/* The entire card is a link to the product details page */}
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <p className="font-bold text-red-600">₹{product.price}</p>
          <p className="text-xs text-gray-500 mt-1">Category: {product.category}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;