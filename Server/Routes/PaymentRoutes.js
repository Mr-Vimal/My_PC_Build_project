// PaymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/Payment.Controller');

// Define routes
router.post('/create-payment', paymentController.createPayment);
// router.put('/payment/update', paymentController.updatePaymentStatus); // Define the PUT route properly

module.exports = router;
