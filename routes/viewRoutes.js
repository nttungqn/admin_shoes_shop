/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const Category = require('./../models/categoryModel')
const Product = require('./../models/productModel');

const router = express.Router();


// router.use(authController.protect);
router.get('/categories', async(req, res) => {const records = await Product.find({}); console.log(records); });
router.route('/product-form').get(viewController.getProductForm).post(viewController.postProductForm);
router.route('/brand-form').get(viewController.getBrandForm).post(viewController.postBrandForm);
router.route('/brands/:id').get(viewController.getBrand).post(viewController.postBrand).delete(viewController.deleteBrand);

router.get('/', viewController.getOverview);
router.get('/products', viewController.getProductTable);
router.get('/brands', viewController.getBrandTable);
router.get('/users', viewController.getUserTable);


module.exports = router;
