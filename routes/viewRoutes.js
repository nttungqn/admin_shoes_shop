/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getDashboard)

router.route('/products').get(viewController.getProductTable)

module.exports = router;
