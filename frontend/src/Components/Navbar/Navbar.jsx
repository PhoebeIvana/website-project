import React from "react";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {" "}
          {/* Ensure vertical center alignment */}
          <div className="flex items-center">
            {" "}
            {/* This will also align logo and the text items vertically center */}
            <div className="flex-shrink-0 flex items-center mr-6">
              {" "}
              {/* Added margin right to separate logo from nav items */}
              <img src={logo} alt="Brand Logo" className="h-10" />
              <p>BLINJI</p>
            </div>
            <div className="flex space-x-4">
              {" "}
              {/* Removed hidden sm:block to make it always visible and adjusted spacing */}
              <a
                href="#" //place the corresponding URL
                className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Shop
              </a>
              <a
                href="#" //place the corresponding URL
                className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Men
              </a>
              <a
                href="#" //place the corresponding URL
                className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Women
              </a>
              <a
                href="#" //place the corresponding URL
                className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Kids
              </a>
            </div>
          </div>
          <div className="flex items-center">
            {" "}
            {/* Ensures that the cart and login button are aligned with the rest */}
            <div className="flex-shrink-0 relative">
              <button className="flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-700">
                <span className="sr-only">View cart</span>
                <img src={cart_icon} alt="Cart" className="h-6" />
                <span className="absolute top-0 right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            <div>
              <button className="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
