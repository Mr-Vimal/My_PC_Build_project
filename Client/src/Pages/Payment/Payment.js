import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default function Payment() {
    const [product, setProduct] = useState({
        name: "TECH SPACE",
        price: 2000,  // Price in cents
        productBy: "TECH SPACE"
    });

    const makePayment = async (token) => {
        const body = {
            token,
            product
        };
        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const response = await axios.post('http://localhost:3002/product/getPayment', body, { headers });
            console.log('Payment Success:', response);
            alert('Payment Successful');
        } catch (error) {
            console.log('Payment Error:', error);
            alert('Payment Error');
        }
    };

    return (
        <div>
            <StripeCheckout
                stripeKey="pk_test_51PKXHcSHOuB9azFbUnd0zltaqbcYiyE5gPiSlLY3eoW1lTNsfkAQR2BSfkzSdlkXTEt4XI5iQVRdbKmPVbskpU7j00rMuAirfg"
                token={makePayment}
                name="Buy TECH SPACE"
                amount={product.price}
                description={`Total amount is $${product.price / 100}`}
                panelLabel="Pay Now"
                currency="INR"
            >
                <button className="btn-large pink">Buy product for ${product.price / 100}</button>
            </StripeCheckout>
        </div>
    );
}
