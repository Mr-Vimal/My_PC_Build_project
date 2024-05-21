import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import './ProductDetails.css';

export default function ProductDetails() {
    const { _id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/product/getProduct/${_id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('An error occurred while fetching product details. Please try again later.');
            }
        };

        fetchProduct();
    }, [_id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details-page">
            <div className="product-details">
                <img src={product.Img} alt={product.ProductName} />
                <h2>{product.ProductName}</h2>
                <p>{product.ProductDescription}</p>
                <p>Category: {product.ProductCategory}</p>
                <p>Price: ${product.Price}<small>.99</small></p>
            </div>
        </div>
    );
}
