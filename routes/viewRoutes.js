/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/products', viewController.getShopCategory);
router.get('/products/:id', viewController.getDetailProduct);

module.exports = router;
