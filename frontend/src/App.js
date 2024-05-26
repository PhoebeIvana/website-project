import "./App.css";
import Navbar  from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopCategory } from "./Pages/ShopCategory";
import { Cart } from "./Pages/Cart";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/SignUp";
import { Shop } from "./Pages/Shop";
import Product from "./Pages/Product";
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/:productId" element={<Product />} />
            <Route />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
