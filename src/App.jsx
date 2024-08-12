import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import Product from "./components/product/Product";
import { FaCartShopping } from "react-icons/fa6";

function App() {
  const [cart, setCart] = useState([]);
  const [add, setAdd] = useState(0);
  const baseURL = "https://headphones-server.onrender.com/products";

  const [sortyBy, setSortyBy] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [add, baseURL]);

  return (
    <div>
      <Router>
        <header>
          <nav className="navbar">
            <ul className="header-link">
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                  to="/"  
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
            </ul>
            <NavLink to="/">
              <div className="cart-icon">
                <FaCartShopping />
                {add > 0 && <span className="cart-count">{add}</span>}
              </div>
            </NavLink>
          </nav>  
        </header>
        <Routes>
          <Route
            path="/"
            element={<Home cart={cart} />}
          />
          <Route
            path="/products"
            element={<Products cart={cart} setCart={setCart} setAdd={setAdd} />}
          />
          <Route path="/products/:productId" element={<Product />} />
        </Routes>
      </Router>
    </div>  
  );
}

export default App;
