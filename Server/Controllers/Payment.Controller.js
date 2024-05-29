const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../Models/Payment.Model');
require('dotenv').config();

const createPayment = async (req, res) => {
    try {
        const { token, product, userInfo } = req.body;

        const charge = await stripe.charges.create({
            amount: product.price * 100, // amount in cents
            currency: 'LKR',
            description: `Payment for ${product.name}`,
            source: token,
            shipping: {
                name: userInfo.name,
                address: {
                    line1: userInfo.address
                }
            }
        });

        res.status(200).json({ charge });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createPayment
};
