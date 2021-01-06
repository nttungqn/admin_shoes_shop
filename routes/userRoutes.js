const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

router.route('/sign-up').get(authController.getSignUp).post(authController.postSignUp);
router.route('/login').get(authController.getLogin).post(authController.postLogin);
router.get('/logout', authController.logout);
router.route('/verify-account').get(authController.getVerifyAccount).post(authController.postVerifyAccount);
router.route('/send-password-reset').get(authController.getSendPasswordReset).post(authController.postSendPasswordReset);
router.route('/confirm-password-reset').get(authController.getConfirmPasswordReset).post(authController.postConfirmPasswordReset);

router.route('/account').get(authController.protect, userController.getAccount).post(authController.protect, userController.postAccount);
router.route('/change-password').get(authController.protect, userController.getChangePassword).post(authController.protect, userController.postChangePassword);
router.get('/order-list', userController.getOrderList);

module.exports = router;