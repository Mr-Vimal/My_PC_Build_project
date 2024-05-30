import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [product] = useState({
        name: "TECH SPACE",
        price: 2000 * 100,  // Price in cents
        productBy: "TECH SPACE",
        model: "Asus Rog Z490"
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
            alert('Payment Error');
        } else {
            const body = {
                paymentMethod,
                product,
            };
            const headers = {
                "Content-Type": "application/json"
            };

            try {
                const response = await axios.post('http://localhost:3002/payment/addpayment', body, { headers });
                console.log('Payment Success:', response);
                alert('Payment Successful');
            } catch (error) {
                console.log('Payment Error:', error);
                alert('Payment Error');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Buy product for Rs {product.price / 100}
            </button>
        </form>
    );
};

const Payment = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default Payment;
