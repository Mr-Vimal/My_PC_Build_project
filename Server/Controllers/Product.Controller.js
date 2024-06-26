const express = require('express');
const mongoose = require('mongoose');
const Product = require('../Models/Product.Model');
const Payment = require('../Models/Payment.Model');
const app = express();
app.use(express.json());
const { upload } = require('../Utils/Multer')

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
            const { ProductName, ProductCategory, Price, ProductBrand } = req.body;
            let Img = null;
            if (req.file && req.file.path) {
                Img = req.file.path;
            }

            const product = new Product({
                ProductName,
                ProductBrand,
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

const findProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);  // Assuming you're using Mongoose
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send({ error: 'Server error' });
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
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({ message: 'Image upload failed' });
        }

        const { id } = req.params;
        const { ProductName, ProductBrand, ProductCategory, Price } = req.body;
        let Img = req.file ? req.file.path : null;

        try {
            // Build the update object dynamically
            let updateData = {
                ProductName,
                ProductBrand,
                ProductCategory,
                Price,
            };

            if (Img) {
                updateData.Img = Img;
            }

            // Update the product in the database
            const result = await Product.findByIdAndUpdate(id, updateData, { new: true });

            // Check if the product was found and updated
            if (!result) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Respond with the updated product data
            res.status(200).json(result);
        } catch (err) {
            // Log the error and respond with a generic error message
            console.error('Error updating product:', err);
            res.status(500).json({ error: 'An error occurred while updating the product' });
        }
    });
};

module.exports = updateProduct;


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
const { v4: uuidv4 } = require("uuid")


// Middleware
app.use(bodyParser.json());
app.use(cors());

const getPayment = async (req, res) => {

    const { product, token } = req.body;
    const transactionKey = uuidv4()
    return stripe.customers.create({
        email: token.eamil,
        source: token.id
    }).then((customer) => {
        stripe.charges.create({
            amount: product.price,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err)
            res.json(err)
        })
    })

};







module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllCategories,
    getPayment,
    // getOneProduct
    // postProduct
    findProduct
};