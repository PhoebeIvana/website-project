import React, { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  item_name: "",
  old_price: "",
  new_price: "",
  item_image: "",
  description: "",
};

const Admin = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Product added successfully!");
        setFormData(initialState); // Clear the form
      } else {
        console.error("Failed to update item in cart");
        toast.error("Failed to update item in cart");
      }
    } catch (error) {
      console.error("Error updating item in cart:", error);
      toast.error("Error updating item in cart");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="item_name" className="font-semibold">
            Item Name:
          </label>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="old_price" className="font-semibold">
            Old Price:
          </label>
          <input
            type="number"
            name="old_price"
            value={formData.old_price}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="new_price" className="font-semibold">
            New Price:
          </label>
          <input
            type="number"
            name="new_price"
            value={formData.new_price}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="item_image" className="font-semibold">
            Item Image URL:
          </label>
          <input
            type="text"
            name="item_image"
            value={formData.item_image}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded h-28"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Admin;
