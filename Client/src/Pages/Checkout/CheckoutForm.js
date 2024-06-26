


// CheckoutPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import './CheckoutForm.css';

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
    });

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const data = loadFromLocalStorage('tableData');
        if (data) {
            setTableData(data);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const calculateTotal = () => {
        if (!tableData) {
            return 0;
        }

        let total = 0;
        tableData.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    };
    const handleToken = async (token) => {
        const amount = calculateTotal();
        const product = {
            name: 'Your Product Name', // Replace with actual product name
            price: amount * 100 // Stripe expects the amount in cents
        };
        const paymentData = {
            token,
            product,
            formData
        };

        try {
            await axios.post('http://localhost:3002/payment/create-payment', paymentData);
            alert('Payment Successful and Email Sent');
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Payment Failed');
        }
    };


    const handleSendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:3002/mail/sendquote', { tableData });
            alert(response.data.message);
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email');
        }
    };

    return (
        <div>
            <section className="checkout-form">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='checkout-left'>
                        <h6>Shipping address</h6>
                        <div className="form-control">
                            <label htmlFor="fullName">Full name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="postalCode">Postal code</label>
                            <input
                                type="text"
                                name="postalCode"
                                id="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <StripeCheckout
                        stripeKey="pk_test_51PKXHcSHOuB9azFbJy0SsinCT82zcTU6HSYNUNgqUl3PpXhyYoiOciMpL10gEt84Z6C1RkpPyGEeACqNW4MPySzX00B76S0qst" // Replace with your India-specific Stripe key
                        token={handleToken}
                        name="Tech Space"
                        amount={calculateTotal() * 100} // Stripe expects amount in cents
                        currency="LKR"
                    >
                        <button type="submit" className="stripe-checkout-button" onClick={handleSendEmail}>Pay Now</button>
                    </StripeCheckout>
                    {/* <button className='btn-mail'  >Mail</button> */}
                </form>
            </section>
        </div>
    );
};

const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

export default CheckoutPage;
