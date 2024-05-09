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
module.exports = {
    createProduct,
    getProduct
};