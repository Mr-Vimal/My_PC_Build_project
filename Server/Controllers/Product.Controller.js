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

const getAllCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories from products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const getOneProduct = async (req, res) => {

//     const { id } = req.params;


//     try {
//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         console.log(product)    
//         res.status(200).json(product);
//     } catch (error) {
//         console.error('Error fetching product:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };




// const postProduct = async (req, res) => {
//     try {
//         const { productId } = req.body;
//         // Your logic to add the product to the cart (e.g., saving to database)
//         res.status(201).json({ message: 'Product added to cart' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const findProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).send({ error: 'Service not found' });
//         }
//         res.status(200).send(product);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// }



// const findProduct=async (req, res) => {
//     try {
//         const { productId } = req.body;
//         const existingCartItem = await CartItem.findOne({ productId });

//         if (existingCartItem) {
//             existingCartItem.quantity += 1;
//             await existingCartItem.save();
//         } else {
//             const newCartItem = new CartItem({ productId });
//             await newCartItem.save();
//         }

//         res.status(201).json({ message: 'Product added to cart' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

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
    const { id } = req.params; // Ensure consistent parameter naming

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", product });
        console.log("Deleted product:", product);
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};






module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllCategories
    // getOneProduct
    // postProduct
    // findProduct
};