import React from "react";
import { Link } from "react-router-dom"; 
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center mr-6">
              <img src={logo} alt="Brand Logo" className="h-10" />
              <p>COLORKOK</p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 relative">
              <Link to="/cart">
                <button className="flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-700">
                  <span className="sr-only">View cart</span>
                  <img src={cart_icon} alt="Cart" className="h-6" />
                  <span className="absolute top-0 right-0 h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
              </Link>
            </div>
            <div>
              <Link to="/login">
                <button className="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
