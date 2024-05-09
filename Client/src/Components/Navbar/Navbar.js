import React from "react";
import "./Navbar.css";
import SearchBar from "../Searchbar/Searchbar";
// import logo from "./assets/images/logo.svg";

export default function Navbar() {



  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logoo">
          <a href="#">boAt</a>
        </div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/customBuild">Custom Build</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
          {/* <li><SearchBar/></li> */}
          <button className="navbtn"><a href="/login">Login</a></button>
        </ul>
      </div>
    </nav>
  );
}
