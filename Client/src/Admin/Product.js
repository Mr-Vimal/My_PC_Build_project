import React, { useState } from 'react';
import axios from 'axios';
export default function AddProduct() {
    const [Img, setImg] = useState('');
    const [ProductName, setProductName] = useState('');
    const [ProductCategory, setProductCategory] = useState('');
    const [Price, setPrice] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const productData = {
            Img,
            ProductName,
            ProductCategory,
            Price,
        };
        try {
            // Make a POST request to the server
            const response = await axios.post('http://localhost:3002/product/createProduct', productData);
            console.log('Response:', response.data);
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please try again later.');
        }
    };

    return (
        <div className='form'>
            <div className='App2'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="file" className="form-control" id="title" placeholder="Enter Imagee" onChange={(e) => setImg(e.target.value)} />
                    <label htmlFor="createdOn">Created On</label>
                    <input type="text" className="form-control" id="createdOn" placeholder="Enter Product Name" onChange={(e) => setProductName(e.target.value)} />
                    <label htmlFor="createdBy">Created By</label>
                    <input type="text" className="form-control" id="createdBy" placeholder="Enter Product Category" onChange={(e) => setProductCategory(e.target.value)} />
                    <label htmlFor="content">Content</label>
                    <input type="number" className="form-control" id="content" placeholder="Enter Product Price" onChange={(e) => setPrice(e.target.value)} />
                    <br />
                    <button type="submit">Submit</button>
                </form>
                {error && <div>Error: {error}</div>}
            </div>
        </div>
    );
}





// <button type="button" className="add" onClick={() => setShowForm(!showForm)}>Add Product</button>
// { showForm && <CreateProduct onAddProduct={handleAddProduct} /> }
//                                         <button className='edit' type='button'>Edit</button>
//                                         <button className='delete' type='button'>Delete</button>
