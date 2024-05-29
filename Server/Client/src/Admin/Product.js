import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';

export default function AddProduct({ setShowForm, onSubmit, editProduct }) {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [ProductName, setProductName] = useState('');
    const [ProductBrand, setProductBrand] =useState('')
    const [ProductCategory, setProductCategory] = useState('');
    const [Price, setPrice] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editProduct) {
            setImageUrl(editProduct.Img);
            setProductName(editProduct.ProductName);
            setProductBrand(editProduct.ProductBrand)
            setProductCategory(editProduct.ProductCategory);
            setPrice(editProduct.Price);
        }
    }, [editProduct]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageFile(file);
            setImageUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('Img', imageFile);
        formData.append('ProductName', ProductName);
        formData.append('ProductBrand', ProductBrand);
        formData.append('ProductCategory', ProductCategory);
        formData.append('Price', Price);

        try {
            if (editProduct) {
                await axios.put(`http://localhost:3002/product/update/${editProduct._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                const response = await axios.post('http://localhost:3002/product/createProduct', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const productData = response.data;
                productData.Img = imageUrl;
                onSubmit(productData);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please try again later.');
        }
    };

    const handleCancel = () => {
        setImageFile(null);
        setImageUrl('');
        setProductName('');
        setProductBrand('');
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
                    <input type="file" id="img" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Product" className='pro-img' />}

                    <label htmlFor="productCategory">Product Category</label>
                    <select id="productCategory" value={ProductCategory} onChange={(e) => setProductCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Motherboard">Motherboard</option>
                        <option value="Processor">Processor</option>
                        <option value="Hard Disk">Hard Disk</option>
                        <option value="RAM">RAM</option>
                        <option value="Casing">Casing</option>
                        <option value="Cooler">Cooler</option>
                        <option value="Graphic Card">Graphic Card</option>
                    </select>
                    <label htmlFor="productBrand">Product Brand</label>
                    <select id="productBrand" placeholder="Enter Product Brand" value={ProductBrand} onChange={(e) => setProductBrand(e.target.value)} >
                        <option value="Asus">Asus</option>
                        <option value="MSI">MSI</option>
                        <option value="Gigabyte">Gigabyte</option>
                        <option value="Asrock">Asrock</option>
                        <option value="Biostar">Biostar</option>
                        <option value="Corsair">Corsair</option>
                        <option value="Western Digital">Western Digital</option>
                        <option value="Nvidia">Nvidia</option>
                        <option value="Logitech">Logitech</option>
                        <option value="">Select Brand</option>
                        <option value="">Select Brand</option>

                    </select>
                    <label htmlFor="ProductName">Product Name</label>
                    <input type="text" id="ProductName" placeholder="Enter Product Name" value={ProductName} onChange={(e) => setProductName(e.target.value)} />
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" placeholder="Enter Product Price" value={Price} onChange={(e) => setPrice(e.target.value)} />
                    <br />
                    <button type="submit">{editProduct ? 'Update' : 'Add'} Product</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </form>
                {error && <div>Error: {error}</div>}
            </div>
        </div>
    );
}