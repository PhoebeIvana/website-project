import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Topup = () => {
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState();
  const location = useLocation();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) <= 0) {
      toast.error("Balance must be a positive number!");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ balance: parseFloat(amount) + user.balance }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAmount("");
        const user = JSON.parse(localStorage.getItem("user"));
        user.balance = data.balance;
        localStorage.setItem("user", JSON.stringify(user));
        window.location.search = "?updateBalance=true";
      } else {
        console.error("Failed to add balance");
        toast.error("Failed to add balance");
      }
    } catch (error) {
      console.error("Error adding balance:", error);
      toast.error("Error adding balance");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("updateBalance")) {
      params.delete("updateBalance");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Add Balance</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="amount" className="font-semibold">
            Amount:
          </label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Balance
        </button>
      </form>
    </div>
  );
};

export default Topup;
