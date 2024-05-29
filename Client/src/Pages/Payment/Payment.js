import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your-public-key-here');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [userInfo, setUserInfo] = useState({
        name: '',
        address: ''
    });

    const [product] = useState({
        name: "TECH SPACE",
        price: 2000,  // Price in LKR
        productBy: "TECH SPACE",
        model: "Asus Rog Z490"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, token } = await stripe.createToken(cardElement);

        if (error) {
            console.log('[error]', error);
        } else {
            const body = {
                token: token.id,
                product,
                userInfo
            };

            try {
                const response = await axios.post('http://localhost:3002/payment/addpayment', body, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
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
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Buy product for Rs {product.price}
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
