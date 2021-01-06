/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();


// router.use(authController.protect);
router.get('/', viewController.getOverview);
router.get('/product-table', viewController.getProductTable);
router.get('/user-table', viewController.getUserTable);
// router.get('/products', viewController.getShopCategory);
// router.get('/products/:id', viewController.getDetailProduct);

module.exports = router;
