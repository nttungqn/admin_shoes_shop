const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const Category = require('./../models/categoryModel')
const Product = require('./../models/productModel');

const router = express.Router();


router.get('/', viewController.getOverview);
router.route('/product-form').get(authController.protect, viewController.getProductForm).post(viewController.postProductForm);
router.route('/products/:id').get(authController.protect, viewController.getProduct).post(authController.protect, viewController.postProduct)
router.get('/products/:id/delete', authController.protect, viewController.deleteProduct);
router.route('/brand-form').get(authController.protect, viewController.getBrandForm).post(authController.protect, viewController.postBrandForm);
router.route('/brands/:id').get(authController.protect, viewController.getBrand).post(authController.protect, viewController.postBrand).delete(authController.protect, viewController.deleteBrand);
router.route('/brands/:id/products').get(authController.protect, viewController.getProductFromBrand)
router.route('/categories/:id/products').get(authController.protect, viewController.getProductFromCategory)
router.route('/orders/:id').get(authController.protect, viewController.getOrderForm).post(authController.protect, viewController.postOrderForm);
router.route('/orders/:id/products').get(authController.protect, viewController.getOrderProduct);

router.get('/products', authController.protect, viewController.getProductTable);
router.get('/brands', authController.protect, viewController.getBrandTable);
router.get('/users', authController.protect, viewController.getUserTable);
router.get('/orders', authController.protect, viewController.getOrderTable);
router.get('/categories', authController.protect, viewController.getCategoryTable);


module.exports = router;
