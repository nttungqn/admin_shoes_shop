const express = require('express');
const router = express.Router();
const commentController = require('./../controllers/commentController');

router.post('/', (req, res, next) => {
    let comment = {
        productId: req.body.productId,
        message: req.body.message,
        email: req.user ? req.user.email : req.body.email,
        avatar: req.user ? req.user.image : 'avatar-default.png',
        name: req.user ? req.user.name : req.body.name,
    }

    commentController.add(comment)
    .then(data => {
        return res.redirect('/products/' + data.productId)})
    .catch(error => next(error));
});

module.exports = router;