const express = require('express');
const router = express.Router();
const productController = require('../Controllers/Product.Controller');
// Routes using controller functions
router.get('/getProduct', productController.getProduct);
router.post('/createProduct', productController.createProduct);
// router.post('/login', userController.userLogin);
// router.put('/update/:id', userController.updateUser);
// router.delete('/delete/:id', userController.deleteUser);


module.exports = router;