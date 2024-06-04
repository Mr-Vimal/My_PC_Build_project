import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";
import CartPage from "../AddTo Cart/Cart";
import Logo1 from '../../Assets/logo11.png';
import ProfileImage from '../../Assets/logo12.png';

export default function Navbar() {
  const [cartVisible, setCartVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfileImage);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const fetchedProfileImage = localStorage.getItem('profileImage');
      if (fetchedProfileImage) {
        setProfileImage(fetchedProfileImage);
      }
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const toggleDropdownVisibility = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logoo">
          <Link to="/"><img src={Logo1} alt="Logo" />TECH SPACE</Link>
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/customBuild">Custom Build</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><a href="#" onClick={toggleCartVisibility}><FontAwesomeIcon icon={faShoppingCart} /></a></li>
          <li>
            {isLoggedIn ? (
              <div className="profile-dropdown">
                <img
                  src={profileImage}
                  alt=""
                  className="profile-image"
                  onClick={toggleDropdownVisibility}
                />
                {dropdownVisible && (
                  <div className="dropdown-menu">
                    <Link to="/accountsetting">Account Setting</Link>
                    <Link to="/passwordchange">Change Password</Link>
                    <Link to="/info">Info</Link>
                    <button className="logout-home-btn" onClick={logout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button className="login-home-btn" onClick={handleLoginClick}>LogIn</button>
              </div>
            )}
          </li>
        </ul>
      </div>
      {cartVisible && <CartPage onClose={toggleCartVisibility} />}
    </nav>
  );
}
