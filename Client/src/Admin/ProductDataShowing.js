import React, { useState, useEffect } from "react";
import axios from 'axios';
import Admin from "./Admin";
import './ProductDataShowing.css'
import CreateProduct from "./Product"; // Import CreateProduct component

export default function DataShowing() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const DataShowing = async () => {
            try {
                const response = await axios.get('http://localhost:3002/product/getProduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('An error occurred while fetching products. Please try again later.');
            }
        };

        DataShowing();
    }, []);

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
        setShowForm(false); // Hide the form after adding the product
    };

    return (
        <div>
            <div className="admin-dashboard">
                <div className="dashboard-flex">
                    <Admin />
                </div>
                <div className="product-table">
                    {error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <>

                            <table className="product-details">
                                <thead>
                                    <tr>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Product Category</th>
                                        <th>Price</th>
                                        <th>Crud</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.Img}</td>
                                            <td>{product.ProductName}</td>
                                            <td>{product.ProductCategory}</td>
                                            <td>{product.Price}</td>
                                            <td>
                                                <button type="button" className="add" onClick={() => setShowForm(!showForm)}>Add Product</button>
                                                {showForm && <CreateProduct onAddProduct={handleAddProduct} />}
                                                <button className='edit' type='button'>Edit</button>
                                                <button className='delete' type='button'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
