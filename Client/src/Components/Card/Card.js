import './Card.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Card() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/product/getProduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('An error occurred while fetching products. Please try again later.');
            }
        };

        fetchData(); // Call fetchData function when component mounts
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <div>
            <div className="product-component">
                {error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div className="product-container">
                        {products.map((product, index) => (
                            <div className="product-card" key={product.id}>
                                <div className="product-image">
                                    <img src={`data:image/png;base64,${product.Img}`} alt={`product ${index}`} />
                                </div>
                                <div className="card-price">
                                    <div className="product-details">
                                        <h3 className="product-name">{product.ProductName}</h3>
                                        <p className="product-description">{product.ProductCategory}</p>
                                    </div>
                                    <div className="product-price">{product.Price}<small>.99</small></div>
                                </div>
                                <div className="product-buttons">
                                    <button className="add-to-cart-button"><a href='/UserProfile'>Add to Cart</a></button>
                                    <button className="add-to-quote">Add to Quote</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
