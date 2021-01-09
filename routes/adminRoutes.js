const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')

router.route('/sign-up').get(authController.getSignUp).post(authController.postSignUp);
router.route('/sign-in').get(authController.getSignIn).post(authController.postSignIn);
router.get('/logout', authController.logout);
// router.route('/verify-account').get(authController.getVerifyAccount).post(authController.postVerifyAccount);
// router.route('/send-password-reset').get(authController.getSendPasswordReset).post(authController.postSendPasswordReset);
// router.route('/confirm-password-reset').get(authController.getConfirmPasswordReset).post(authController.postConfirmPasswordReset);

router.route('/account').get(authController.protect, adminController.getAccount).post(authController.protect, adminController.postAccount);
// router.route('/change-password').get(authController.protect, userController.getChangePassword).post(authController.protect, userController.postChangePassword);
// router.get('/order-list', userController.getOrderList);

module.exports = router;