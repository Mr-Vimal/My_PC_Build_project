// import React, { useState } from 'react';
// import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios';
// // require('dotenv').config()

// export default function Payment() {
//     const [product] = useState({
//         name: "TECH SPACE",
//         price: 2000 * 100,  // Price in cents
//         productBy: "TECH SPACE",
//         model: "Asus Rog Z490"
//     });

//     const makePayment = async (token) => {
//         const body = {
//             token,
//             product,
//         };
//         const headers = {
//             "Content-Type": "application/json"
//         };

//         try {
//             const response = await axios.post('http://localhost:3002/payment/addpayment', body, { headers });
//             console.log('Payment Success:', response);
//             alert('Payment Successful');
//         } catch (error) {
//             console.log('Payment Error:', error);
//             alert('Payment Error');
//         }
//     };

//     return (
//         <StripeCheckout
//             stripeKey={"pk_test_51PKXHcSHOuB9azFbUnd0zltaqbcYiyE5gPiSlLY3eoW1lTNsfkAQR2BSfkzSdlkXTEt4XI5iQVRdbKmPVbskpU7j00rMuAirfg"}
//             token={makePayment}
//             name={product.model}
//             amount={product.price}
//             description={`Total amount is Rs ${product.price / 100}`}
//             panelLabel="Pay Now"
//             currency="LKR"
//         >
//             <button className="btn-large pink">Buy product for Rs {product.price / 100}</button>
//         </StripeCheckout>
//     );
// }
