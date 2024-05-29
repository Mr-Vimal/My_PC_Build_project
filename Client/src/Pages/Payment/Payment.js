// import React, { useState } from 'react';
// import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios';

// export default function Payment() {
//     const [product] = useState({
//         name: "TECH SPACE",
//         price: 2000 * 100,  // Price in cents
//         productBy: "TECH SPACE",
//         model: "Asus Rog Z490"
//     });

//     const [userInfo, setUserInfo] = useState({
//         name: '',
//         address: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUserInfo(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const makePayment = async (token) => {
//         const body = {
//             token,
//             product,
//             userInfo
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
//         <div>
//             <div>
//                 <label>
//                     Name:
//                     <input 
//                         type="text" 
//                         name="name" 
//                         value={userInfo.name} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Address:
//                     <input 
//                         type="text" 
//                         name="address" 
//                         value={userInfo.address} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </label>
//             </div>
//             <StripeCheckout
//                 stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
//                 token={makePayment}
//                 name={product.model}
//                 amount={product.price}
//                 description={`Total amount is Rs ${product.price / 100}`}
//                 panelLabel="Pay Now"
//                 currency="LKR"
//             >
//                 <button className="btn-large pink">Buy product for Rs {product.price / 100}</button>
//             </StripeCheckout>
//         </div>
//     );
// }
