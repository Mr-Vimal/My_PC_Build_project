const express = require('express');
const router = express.Router();
const productController = require('../Controllers/Product.Controller');
// Routes using controller functions
router.get('/getProduct', productController.getProduct);
// router.get('/getProduct/:id', productController.getOneProduct);
router.post('/createProduct', productController.createProduct);
// router.post('/login', productController.userLogin);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/getCategory/', productController.getAllCategories);
router.post('/getPayment', productController.getPayment);

// router.post('/cart',productController.postProduct);
router.get('/find', productController.findProduct);


module.exports = router;






































