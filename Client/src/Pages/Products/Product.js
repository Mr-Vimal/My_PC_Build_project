import React from "react";
import './Product.css'
import Navbar from "../../Components/Navbar/Navbar";
import productImg from './board.png'
import Card from "../../Components/Card/Card";

export default function Products() {

    return (
        <>
            <Navbar />

            <div class="product-container" id="product-container">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </>
    )
}