import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('token');

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
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
          <li><a href="/cart"><FontAwesomeIcon icon={faShoppingCart} /></a></li>
          <li>
            {auth ? (
              <Link onClick={logout} to="/login">
                <FontAwesomeIcon icon={faSignOutAlt} /> LogOut
              </Link>
            ) : (
              <Link to="/login">LogIn</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
