const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

router.use(authController.protect);
router.route('/:id').get(userController.getUser).post(userController.postUser);

module.exports = router;