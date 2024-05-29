import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";
import CartPage from "../AddTo Cart/Cart";

export default function Navbar() {
  const [cartVisible, setCartVisible] = useState(false);
  const auth = localStorage.getItem('token');

  const logout = () => {
    localStorage.clear();
    // Redirect to signup page after logout
    window.location.href = '/signup';
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logoo">
          <a href="/">Tech Space</a>
        </div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/customBuild">Custom Build</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
          {/* Toggle visibility of cart page table */}
          {/* <li><a href="#" onClick={toggleCartVisibility}><FontAwesomeIcon icon={faShoppingCart} /></a></li> */}
          <li>
            {auth ? (
              <Link onClick={logout} to="#">
                {/* <FontAwesomeIcon icon={faSignOutAlt} /> LogOut */}
              </Link>
            ) : (
              <Link to="/login">LogIn</Link>
            )}
          </li>
        </ul>
      </div>
      {/* Render CartPage component conditionally based on cart visibility */}
      {cartVisible && <CartPage onClose={toggleCartVisibility} />}
    </nav>
  );
}
