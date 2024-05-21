import React, { useState, useEffect } from "react";
import axios from 'axios';
import Admin from "./Admin";
import './ProductDataShowing.css'
import AddProduct from "./Product"; // Import AddProduct component

export default function DataShowing() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

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

        fetchData();
    }, []);

    const handleAddProduct = () => {
        setShowForm(true); // Show the form
    };
    const handleDeleteProduct = async (ProductId) => {
        try {
            await axios.delete(`http://localhost:3002/product/delete/${ProductId}`);
            setProducts(products.filter(product => product.ProductId !== ProductId));
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('An error occurred while deleting the product. Please try again later.');
        }
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
                                    <tr key={product.ProductId}>
                                        <td>{product.Img}</td>
                                        <td>{product.ProductName}</td>
                                        <td>{product.ProductCategory}</td>
                                        <td>{product.Price}</td>
                                        <td>
                                            <button className="add" onClick={handleAddProduct}>Add Product</button>
                                            <button type="button" className="delete" onClick={() => handleDeleteProduct(product.ProductId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {showForm && <AddProduct setShowForm={setShowForm} />}
        </div>
    );
}
