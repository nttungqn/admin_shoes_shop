/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();


// router.use(authController.protect);
router.get('/', viewController.getOverview);
router.get('/product-table', viewController.getProductTable);
router.get('/user-table', viewController.getUserTable);
router.get('/brand-table', viewController.getBrandTable);


router.route('/brands/:id').get(viewController.getBrand).post(viewController.postBrand).delete(viewController.deleteBrand);

module.exports = router;
