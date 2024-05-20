import './Card.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function Card() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/product/getProduct');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('An error occurred while fetching products. Please try again later.');
            }
        };

        fetchData();
    }, []);


    const Cart = async (productId) => {

        try {
            await axios.post(`http://localhost:3002/cart`, { productId });
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart. Please try again later.');
        }
    };

    const handleSearchInputChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filtered = products.filter(product =>
            product.ProductName.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filtered);
    };

    const handleSearch = () => {
        const filtered = products.filter(product =>
            product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        } else if (event.key === 'Backspace' && searchTerm === '') {
            setFilteredProducts(products);
        }
    };

    const handleMinPriceChange = (event) => {
        const price = event.target.value;
        setMinPrice(price);
    };

    const handleMaxPriceChange = (event) => {
        const price = event.target.value;
        setMaxPrice(price);
    };

    // const handleClear = () => {
    //     setMinPrice('');
    //     setMaxPrice('');
    //     setFilteredProducts(products);
    // };

    useEffect(() => {
        const min = minPrice !== '' ? parseFloat(minPrice) : 0;
        const max = maxPrice !== '' ? parseFloat(maxPrice) : Number.MAX_VALUE;
        const filtered = products.filter(product =>
            product.Price >= min && product.Price <= max
        );
        setFilteredProducts(filtered);
    }, [minPrice, maxPrice, products]);

    return (
        <div>
            <div className='product-page'>
                <div className='product-left'>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                            onKeyPress={handleKeyPress}
                            className="search-input"
                        />
                    </div>
                    <div className="price-range">
                        <label>Price Range:</label>
                        <div className="price-inputs">
                            <input
                                type="number"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                                className="price-input"
                                placeholder="Min Price"
                            />
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                                className="price-input"
                                placeholder="Max Price"
                            />
                        </div>
                        {/* <button onClick={handleClear} className="clear-button">Clear</button> */}
                    </div>
                </div>
                <div className="product-component">
                    {error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <div className="product-container">
                            {filteredProducts.map((product) => (
                                <div className="product-card" key={product._id}>
                                    <div className="product-image">
                                        <img src={product.Img} alt={product.ProductName} />
                                    </div>
                                    <div className="card-price">
                                        <div className="product-details">
                                            <h3 className="product-name">{product.ProductName}</h3>
                                            <p className="product-description">{product.ProductCategory}</p>
                                        </div>
                                        <div className="product-price">{product.Price}<small>.99</small></div>
                                    </div>
                                    <div className="product-buttons">
                                        <button onClick={() => Cart(product._id)}>Add to Cart</button>
                                        <button className="add-to-quote">Add to Quote</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
