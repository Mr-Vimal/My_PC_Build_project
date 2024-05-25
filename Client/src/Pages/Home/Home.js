import React from "react";
import './Home.css';
import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";
import Products from "../Products/Product";
import Quote from "../Quotation/Quote";
import Cart from "../../Components/AddTo Cart/Cart";
import Payment from "../Payment/Payment";
import Details from "../Products/Details";
import Footer from "../../Components/Footer/Footer";
export default function Home() {

    return (
        <>
            <Navbar />
            <div className="home">
                <div className="homeletter">
                    <p className="sub-title">The Season to </p>
                    <h1 className="homelet1">BUILD PC</h1>
                </div>
                <div className="homebtn">
                    <button type="button" className="homebtn1"><a href="/products">See More Products</a></button>
                    <button type="button" className="homebtn2"><a href="/custombuild">Dream System</a></button>
                </div>
            </div>
            <Products />
            <Footer/>
        </>
    );
}
