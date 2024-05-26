import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quote.css'; // Import the CSS file

const Dropdown = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selections, setSelections] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3002/product/getProduct');
                setProducts(response.data);
                const categories = [...new Set(response.data.map(product => product.ProductCategory))];
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedBrand('');
        setSelectedModel('');
        setModels([]);
        const brands = products
            .filter(product => product.ProductCategory === category)
            .map(product => product.ProductName);
        setBrands([...new Set(brands)]);
    };

    const handleBrandChange = (e) => {
        const brand = e.target.value;
        setSelectedBrand(brand);
        setSelectedModel('');
        const models = products
            .filter(product => product.ProductCategory === selectedCategory && product.ProductName === brand)
            .map(product => product.ProductName);
        setModels([...new Set(models)]);
    };

    const handleModelChange = (e) => {
        const model = e.target.value;
        setSelectedModel(model);
    };

    const handleAddSelection = () => {
        if (selectedCategory && selectedBrand && selectedModel) {
            const selectedProduct = products.find(product =>
                product.ProductCategory === selectedCategory &&
                product.ProductName === selectedBrand &&
                product.ProductName === selectedModel
            );

            if (selectedProduct) {
                const existingItemIndex = tableData.findIndex(item =>
                    item.category === selectedCategory &&
                    item.brand === selectedBrand &&
                    item.model === selectedModel
                );

                if (existingItemIndex !== -1) {
                    const newTableData = [...tableData];
                    newTableData[existingItemIndex].quantity++;
                    setTableData(newTableData);
                } else {
                    const newSelection = {
                        category: selectedProduct.ProductCategory,
                        brand: selectedProduct.ProductName,
                        model: selectedProduct.ProductName,
                        price: selectedProduct.Price,
                        quantity: 1
                    };
                    setSelections([...selections, newSelection]);
                    setTableData([...tableData, newSelection]); // Add selected model to table data
                }
            }
        }
    };

    const handleIncrement = (index) => {
        const newTableData = [...tableData];
        newTableData[index].quantity++;
        setTableData(newTableData);
    };

    const handleDecrement = (index) => {
        const newTableData = [...tableData];
        if (newTableData[index].quantity > 1) {
            newTableData[index].quantity--;
            setTableData(newTableData);
        }
    };

    const handleRemove = (index) => {
        const newSelections = selections.filter((_, i) => i !== index);
        const newTableData = tableData.filter((_, i) => i !== index);
        setSelections(newSelections);
        setTableData(newTableData);
    };

    const handleClearAll = () => {
        setSelections([]);
        setTableData([]);
    };

    const handlePrint = () => {
        if (tableData.length === 0) {
            alert('Nothing added in quote. Please add items to the quote.');
        } else {
            window.print();
        }
    };

    return (
        <div>
            <div className="dropdown-container">
                <label htmlFor="category">Category:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <label htmlFor="brand">Brand:</label>
                <select id="brand" value={selectedBrand} onChange={handleBrandChange} disabled={!selectedCategory}>
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>

                <label htmlFor="model">Model:</label>
                <select id="model" value={selectedModel} onChange={handleModelChange} disabled={!selectedBrand}>
                    <option value="">Select Model</option>
                    {models.map(model => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>

                <button onClick={handleAddSelection} disabled={!selectedModel}>Add</button>
                <button className='print-btn' onClick={handlePrint}>Print</button>
                <button className='download-quotation-btn' >Download Quotation</button>
                <button className='proceed-to-checkout-btn' >Proceed to Checkout</button>
            </div>

            <div>
                <h3>Selected Models:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.category}</td>
                                <td>{item.brand}</td>
                                <td>{item.model}</td>
                                <td>${item.price}</td>
                                <td>
                                    <button onClick={() => handleDecrement(index)}>-</button>
                                    {item.quantity}
                                    <button onClick={() => handleIncrement(index)}>+</button>
                                </td>
                                <td>${item.price * item.quantity}</td>
                                <td>
                                    <button onClick={() => handleRemove(index)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleClearAll} style={{ float: 'right' }}>Clear All</button>
            </div>
        </div>
    );
};

export default Dropdown;
