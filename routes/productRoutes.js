const express = require('express');
const { route } = require('../app');
const router = express.Router();
const productController = require('./../controllers/productController');

router.route('/').get(productController.getAllProducts).post(addProduct);
router.route('/:id').get(productController.getProduct).patch(productController.updateProduct).delete(productController.deleteProduct);

module.exports = router;