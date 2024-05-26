const express = require('express');
const mongoose = require('mongoose');
const Product = require('../Models/Product.Model');
const Payment = require('../Models/Payment.Model');
const app = express();
app.use(express.json());
const {upload} = require('../Utils/Multer')

// routes/productRoutes.js
// const express = require('express');
const router = express.Router();
// const upload = require('../config/multerConfig');
// const Product = require('../models/Product'); // Assuming you have a Product model

const createProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({ message: 'Image upload failed' });
        }

        try {
            const { ProductName, ProductCategory, Price } = req.body;
            let Img = null;
            if (req.file && req.file.path) {
                Img = req.file.path;
            }

            const product = new Product({
                ProductName,
                ProductCategory,
                Price,
                Img
            });

            await product.save();

            return res.status(201).json({ message: 'Product created successfully', product });
        } catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    });
};

// router.post('/create', createProduct);

// module.exports = router;



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



const stripe = require('stripe')('sk_test_51PKXHcSHOuB9azFb19ujBuckQY9h0oxGgud88khmSavRDMCrMA3eOHvshqX21vUPWCMRWPjqQpMKFMdyXiRd096w00DiIL7zQw');
const bodyParser = require('body-parser');
const cors = require('cors');


// Middleware
app.use(bodyParser.json());
app.use(cors());

const getPayment = async (req, res) => {
    const { token, product } = req.body;
    console.log('PRODUCT', product);
    console.log('PRICE', product.price);
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const charge = await stripe.charges.create({
            amount: product.price,
            currency: 'LKR',
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        });
        console.log('Charge:', { charge });
        res.status(200).json(charge);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};







module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllCategories,
    getPayment
    // getOneProduct
    // postProduct
    // findProduct
};