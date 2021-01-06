const express = require('express');
const cartController = require('./../controllers/cartController')
const authController = require('./../controllers/authController')

const router = express.Router();


router.route('/').get(cartController.getCart).post(cartController.postCart).put(cartController.putCart).delete(cartController.deleteCart);

router.use(authController.protect);
router.route('/tracking-order').get(cartController.getTrackingOrder).post(cartController.postTrackingOrder);
router.route('/success-order').get(cartController.getSuccessOrder);


module.exports = router;
