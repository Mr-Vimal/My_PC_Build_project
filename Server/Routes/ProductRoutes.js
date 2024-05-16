const express = require('express');
const router = express.Router();
const productController = require('../Controllers/Product.Controller');
// Routes using controller functions
router.get('/getProduct', productController.getProduct);
router.post('/createProduct', productController.createProduct);
// router.post('/login', productController.userLogin);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);


module.exports = router;