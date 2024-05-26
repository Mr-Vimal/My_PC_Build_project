// const express = require('express');
// const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// const getPayment = async (req, res) => {
//     const { token, product } = req.body;
//     console.log('PRODUCT', product);
//     console.log('PRICE', product.price);
//     try {
//         const customer = await stripe.customers.create({
//             email: token.email,
//             source: token.id
//         });

//         const charge = await stripe.charges.create({
//             amount: product.price,
//             currency: 'usd',
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `Purchase of ${product.name}`,
//             shipping: {
//                 name: token.card.name,
//                 address: {
//                     line1: token.card.address_line1,
//                     line2: token.card.address_line2,
//                     city: token.card.address_city,
//                     country: token.card.address_country,
//                     postal_code: token.card.address_zip
//                 }
//             }
//         });
//         console.log('Charge:', { charge });
//         res.status(200).json(charge);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports(
//     getPayment
// )

