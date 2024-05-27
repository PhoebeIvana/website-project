import React, { useEffect, useState } from "react";
import { AboutUs } from "../Components/AboutUs/AboutUs"; 

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // Update state with fetched cart items
      setCartItems(data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
      if (response.ok) {
        // Remove item from cart items state
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      } else {
        console.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity }),
      });
      if (response.ok) {
        // Update item quantity in cart items state
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, quantity } : item
          )
        );
        if (quantity === 0) {
          // Remove item from cart if quantity becomes zero
          removeItem(itemId);
        }
      } else {
        console.error("Failed to update item quantity in cart");
      }
    } catch (error) {
      console.error("Error updating item quantity in cart:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cartItems.map((item) => (
          <div key={item._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-56 object-cover object-center" />
            <div className="p-4">
              {/* Item details */}
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">Price: ${item.price}</p>
              <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>

              {/* Buttons for quantity controls */}
              <div className="flex items-center mb-4"> 
                <button //Decrease Button
                  className="bg-gray-200 text-gray-700 py-1 px-2 rounded-l"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button //Increase Button
                  className="bg-gray-200 text-gray-700 py-1 px-2 rounded-r"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button //Remove Button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => {
                  removeItem(item._id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <AboutUs />
      </footer>
    </div>
  );
};