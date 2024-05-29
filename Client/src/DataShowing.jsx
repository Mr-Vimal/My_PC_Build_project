import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function ProductDataShow() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="product-card">
            {products.map(product => (
                <div key={product.id} className="product-item">
                    <div className="product-image">
                        <img src={product.Img} alt="Product Name" className="product-img" />
                    </div>
                    <div className="card-price">
                        <div className="product-name">
                            <h3 className="product-name">{product.ProductName}</h3>
                            <p className="product-category">{product.ProductCategory}</p>
                        </div>
                        <div className="product-price">{product.ProductPrice},<small>999</small></div>
                    </div>
                    <div className="product-btns">
                        <button className="add-to-cart-button">Add to Cart</button>
                        <button className="add-to-quote">Add to Quote</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
