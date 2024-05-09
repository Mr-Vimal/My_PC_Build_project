import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
    const [Img, setImg] = useState('');
    const [ProductName, setProductName] = useState('');
    const [ProductCategory, setProductCategory] = useState('');
    const [Price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data as an object
        const productData = {
            Img,
            ProductName,
            ProductCategory,
            Price
        };

        try {   
            // Send the form data to the server
            const response = await axios.post('http://localhost:3002/product/createProduct', productData);
            console.log('response:', response.data);
            alert('Data has been Saved');

            // Clear the input fields after successful submission
            setImg('');
            setProductName('');
            setProductCategory('');
            setPrice('');

            // Redirect to another page after successful submission if needed
            // navigate('/another-page');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request. Please try again later.');
        }
    };

    return (
        <div className='form'>
            <div className='App2'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="addImg">Image</label>
                    <input type="file" className="form-control" id="addImg" placeholder="Add Product Image" value={Img} onChange={(e) => setImg(e.target.value)} />
                    <label htmlFor="productName">Product Name</label>
                    <input type="text" className="form-control" id="productName" placeholder="Enter Product Name" value={ProductName} onChange={(e) => setProductName(e.target.value)} />
                    <label htmlFor="productCategory">Product Category</label>
                    <input type="text" className="form-control" id="productCategory" placeholder="Enter Product Category" value={ProductCategory} onChange={(e) => setProductCategory(e.target.value)} />
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" placeholder="Enter Product Price" value={Price} onChange={(e) => setPrice(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
