const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

router.route('/:id').get(authController.protect, userController.getUser).post(authController.protect, userController.postUser);

module.exports = router;