import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';

export default function AddProduct({ setShowForm, onSubmit, editProduct }) {
    const [Img, setImg] = useState('');
    const [ProductName, setProductName] = useState('');
    const [ProductCategory, setProductCategory] = useState('');
    const [Price, setPrice] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editProduct) {
            setImg(editProduct.Img);
            setProductName(editProduct.ProductName);
            setProductCategory(editProduct.ProductCategory);
            setPrice(editProduct.Price);
        }
    }, [editProduct]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const productData = {
            Img,
            ProductName,
            ProductCategory,
            Price,
            _id: editProduct ? editProduct._id : undefined
        };
        try {
            if (editProduct) {
                await axios.put(`http://localhost:3002/product/update/${editProduct._id}`, productData);
            } else {
                const response = await axios.post('http://localhost:3002/product/createProduct', productData);
                productData._id = response.data._id;
            }
            onSubmit(productData);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please try again later.');
        }

    };

    

    const handleCancel = () => {
        setImg('');
        setProductName('');
        setProductCategory('');
        setPrice('');
        setError('');
        setShowForm(false);
    };

    return (
        <div className='form'>
            <div className='App2'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="img">Image</label>
                    <input type="file" className="form-control" id="img" placeholder="Enter Image URL" value={Img} onChange={(e) => setImg(e.target.value)} />
                    <label htmlFor="productName">Product Name</label>
                    <input type="text" className="form-control" id="productName" placeholder="Enter Product Name" value={ProductName} onChange={(e) => setProductName(e.target.value)} />
                    <label htmlFor="productCategory">Product Category</label>
                    <select className="form-control" id="productCategory" value={ProductCategory} onChange={(e) => setProductCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Motherboard">Motherboard</option>
                        <option value="Processor">Processor</option>
                        <option value="Hard Disk">Hard Disk</option>
                    </select>
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" placeholder="Enter Product Price" value={Price} onChange={(e) => setPrice(e.target.value)} />
                    <br />
                    <button type="submit">{editProduct ? 'Update' : 'Add'} Product</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </form>
                {error && <div>Error: {error}</div>}
            </div>
        </div>
    );
}
