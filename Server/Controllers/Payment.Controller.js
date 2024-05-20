const stripe = require('stripe')('Vimal'); // Make sure to replace with your actual Stripe secret key
const Payment = require('../Models/Payment.Model')

const CreatePayment = async (req, res) => {
    const { amount, email, name } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: { email, name },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};



const SavePayment = async (req, res) => {
    const { name, email, amount, transactionId } = req.body;

    const payment = new Payment({
        name,
        email,
        amount,
        transactionId,
    });

    try {
        await payment.save();
        res.status(201).send('Payment saved successfully');
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    CreatePayment,
    SavePayment
};
