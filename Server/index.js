
const mongoose = require('mongoose');
const connectDB = require('./DB/Connect');
// connectDB()




const express = require('express');
const userRoutes = require('./Routes/UserRoutes');
const ProductRoutes = require('./Routes/ProductRoutes');
cors = require('cors');
const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on the port ${PORT}`)
        })
        app.use(express.json());
        app.use('/user', userRoutes)
        app.use('/product', ProductRoutes)



    }
    catch (error) {
        console.log(error)
    }
}
startServer();

app.post('/cart', async (req, res) => {
    try {
        const { productId } = req.body;
        // Your logic to add the product to the cart (e.g., saving to database)
        res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// app.get('/', async (req, res) => {
//     try {
//         const cart = await Cart.findOne().populate('items.productId');
//         res.json(cart ? cart.items : []);
//     } catch (err) {
//         console.error('Error fetching cart items:', err);
//         res.status(500).json({ message: 'An error occurred while fetching cart items.' });
//     }
// });
// app.post('/add', async (req, res) => {
//     const { productId } = req.body;

//     try {
//         let cart = await Cart.findOne();
//         if (!cart) {
//             cart = new Cart({ items: [] });
//         }

//         const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
//         if (itemIndex > -1) {
//             cart.items[itemIndex].quantity += 1;
//         } else {
//             const product = await Product.findById(productId);
//             if (!product) {
//                 return res.status(404).json({ message: 'Product not found' });
//             }
//             cart.items.push({ productId });
//         }

//         await cart.save();
//         res.status(201).json(cart);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });



// const app = express();
// app.use(express.json());
// app.use(cors());




// app.listen(3001, () => {
//    console.log('Server is running on port 3001');
// });

// mongoose.connectDB

