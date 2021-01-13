/** @format */
const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const Category = require('./../models/categoryModel')
const Product = require('./../models/productModel');

const router = express.Router();


// router.use(authController.protect);
router.route('/product-form').get(viewController.getProductForm).post(viewController.postProductForm);
router.route('/products/:id').get(viewController.getProduct).post(viewController.postProduct)
router.get('/products/:id/delete',viewController.deleteProduct);
router.route('/brand-form').get(viewController.getBrandForm).post(viewController.postBrandForm);
router.route('/brands/:id').get(viewController.getBrand).post(viewController.postBrand).delete(viewController.deleteBrand);
router.route('/brands/:id/products').get(viewController.getProductFromBrand)
// router.route('/users/:id').get(viewController.getUser).post(viewController.postUser);

router.get('/', viewController.getOverview);
router.get('/products', viewController.getProductTable);
router.get('/brands', viewController.getBrandTable);
router.get('/users', viewController.getUserTable);
router.get('/orders', viewController.getOrderTable);


module.exports = router;
