import React from "react";
import './Product.css'
import Navbar from "../../Components/Navbar/Navbar";
// import productImg from './board.png'
// import SearchBar from "../../Components/Searchbar/Searchbar";
// import PriceBar from "../../Components/Price-Bar/Price-Bar";
import ProductCard from "../../Admin/Product";
import DataShowing from "../../Admin/ProductDataShowing";
import Card from "../../Components/Card/Card";
import CreateProduct from "../../Admin/Product";

export default function Products() {

    return (
        <>
            <Navbar />
            <div className="product-component">
                <div className="price-bar">
                    <CreateProduct />
                </div>
                <div className="product-component">
                    <Card />
                </div>
            </div>
        </>
    )
}