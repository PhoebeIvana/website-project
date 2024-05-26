import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data_product from "../Components/Assets/data";

const Product = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);  // Start with 1 for better UX
  const [selectedSize, setSelectedSize] = useState(''); // New state for size selection
  const product = data_product.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Product not found</div>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(0, prev + delta));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-2xl p-8 bg-white shadow-xl rounded-lg space-y-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg"
        />
        <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
        <div className="flex justify-between items-center">
          <p className="text-4xl text-red-500 font-bold">${product.new_price.toFixed(2)}</p>
          <p className="text-xl text-gray-500 line-through">${product.old_price.toFixed(2)}</p>
        </div>
        <p className="text-gray-600">
          {product.description || "No description available."}
        </p>
        <div className="text-gray-700">
          <p><strong>Category:</strong> {product.category}</p>
        </div>
        <div>
          <strong>Select Size:</strong>
          <div className="flex space-x-2 mt-2">
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <button
                key={size}
                className={`py-2 px-4 border ${selectedSize === size ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4">
          <button
            className="text-lg px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            className="text-lg px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={quantity === 0}
          onClick={() => alert("Added to cart!")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
