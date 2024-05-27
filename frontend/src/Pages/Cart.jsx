import React, { useEffect, useState } from "react";
import { AboutUs } from "../Components/AboutUs/AboutUs"; 

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/${user._id}/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setCartItems((prevItems) => prevItems.filter((item) => item.item_id._id !== itemId));
      } else {
        console.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, item_id: itemId, quantity }),
      });
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.item_id._id === itemId ? { ...item, quantity } : item
          )
        );
        if (quantity === 0) {
          removeItem(itemId);
        }
      } else {
        console.error("Failed to update item quantity in cart");
      }
    } catch (error) {
      console.error("Error updating item quantity in cart:", error);
    }
  };

  const updateSize = async (itemId, newSize) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, item_id: itemId, size: newSize }),
      });
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.item_id._id === itemId ? { ...item, size: newSize } : item
          )
        );
      } else {
        console.error("Failed to update item size in cart");
      }
    } catch (error) {
      console.error("Error updating item size in cart:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cartItems && cartItems.map((item) => (
          <div key={item.item_id._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={item.item_id.item_image} alt={item.item_id.item_name} className="w-full h-56 object-cover object-center" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.item_id.item_name}</h3>
              <p className="text-gray-600 mb-2">Price: ${item.item_id.new_price}</p>
              <p className="text-gray-600 mb-2">Size: {item.size}</p>
              <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>

              <div className="flex items-center mb-4">
                <button
                  className="bg-gray-200 text-gray-700 py-1 px-2 rounded-l"
                  onClick={() => updateQuantity(item.item_id._id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  className="bg-gray-200 text-gray-700 py-1 px-2 rounded-r"
                  onClick={() => updateQuantity(item.item_id._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex items-center mb-4">
                <label className="mr-2">Size:</label>
                <select
                  value={item.size}
                  onChange={(e) => updateSize(item.item_id._id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => removeItem(item.item_id._id)}
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
