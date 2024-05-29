const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../Models/Payment.Model');
require('dotenv').config();

const createPayment = async (req, res) => {
    try {
        const { amount, userInfo } = req.body;
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }
        if (!userInfo || !userInfo.name || !userInfo.address) {
            return res.status(400).json({ error: 'Invalid user information' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'LKR',
            description: `Payment for ${userInfo.name}`,
            shipping: {
                name: userInfo.name,
                address: {
                    line1: userInfo.address
                }
            }
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentIntentId, status, userId, amount, bookingId } = req.body;
        if (!paymentIntentId || !status || !userId || !amount || !bookingId) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const payment = new Payment({
            userId,
            bookingId,
            amount,
            paymentIntentId,
            status,
        });

        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment details', error });
    }
};

module.exports = {
    createPayment,
    updatePaymentStatus,
    getAllPayments
};
