const express = require('express');
const mongoose = require('mongoose');
const Product = require('../Models/Product.Model');
const app = express();
app.use(express.json());

const createProduct = async (req, res) => {
    try {
        // Create a new user object
        const product = new Product({
            Img: req.body.Img,
            ProductName: req.body.ProductName,
            ProductCategory: req.body.ProductCategory,
            Price: req.body.Price,
        });

        // Save the user to the database
        await product.save();

        // Send success response
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error creating user:', error);

        // Send error response
        return res.status(500).json({ message: 'Something went wrong' });
    }
};


const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching notes:', err);
        res.status(500).json({ error: 'An error occurred while fetching notes' });
    }
};


// const uodateProduct=('/product/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         await User.findByIdAndUpdate(id, req.body);
//         const product = await User.findById(id)
//         res.status(200).json(product);
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
// )
const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Update the product in the database
        const result = await Product.findByIdAndUpdate(id, req.body);

        // Check if the product was found and updated
        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        // Log the error and respond with a generic error message
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
};



const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await User.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json(product)
        console.log("Deleted")

    }
    catch (err) {
        console.log(err)
    }
};


module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};