import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3002/cart');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('An error occurred while fetching cart items. Please try again later.');
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <div className="cart-container">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item._id}>
                            <div className="cart-image">
                                <img src={item.productId.imageUrl} alt={item.productId.name} />
                            </div>
                            <div className="cart-details">
                                <h3>{item.productId.name}</h3>
                                <p>${item.productId.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
