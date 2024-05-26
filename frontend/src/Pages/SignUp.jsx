import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const PasswordErrorMessage = () => (
  <p className="text-red-500 text-xs italic mt-2">
    Password should have at least 4 characters
  </p>
);

export const Signup = () => {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", isTouched: false });
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const getIsFormValid = () =>
    name && validateEmail(email) && password.value.length >= 4;

  const validateEmail = (email) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Sign Up
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name <sup className="text-red-600">*</sup>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address <sup className="text-red-600">*</sup>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <sup className="text-red-600">*</sup>
              </label>
              <input
                type="password"
                value={password.value}
                onChange={(e) =>
                  setPassword({ ...password, value: e.target.value })
                }
                onBlur={() => setPassword({ ...password, isTouched: true })}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
              {password.isTouched && password.value.length < 4 && (
                <PasswordErrorMessage />
              )}
            </div>
          </div>
          {signupError && (
            <p className="text-red-500 text-center text-sm">{signupError}</p>
          )}
          <button
            type="submit"
            disabled={!getIsFormValid()}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
    </Routes>
  </Router>
);

export default App;
