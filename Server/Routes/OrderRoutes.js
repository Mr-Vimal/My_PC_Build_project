const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/Order.Controller');

// Route to add an item to the cart
router.post('/orderdetails', OrderController.createOrderForm);

// Route to get cart items for a specific user
// router.put('/paymentupdate', PaymentController.updatePaymentStatus);

module.exports = router;
