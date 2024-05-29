const express = require('express');
const router = express.Router();
const PaymentController = require('../Controllers/Payment.Controller');

// Route to add an item to the cart
router.post('/addpayment', PaymentController.createPayment);

// Route to get cart items for a specific user
// router.put('/paymentupdate', PaymentController.updatePaymentStatus);

module.exports = router;
