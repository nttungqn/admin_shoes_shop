const productController = require('./productController');
const Order = require('./../models/orderModel');
const AppError = require('../utils/AppError');

module.exports.getCart = (req, res, next) => {
	let cart = req.session.cart;
	res.locals.cart = cart.getCart();
	res.render('cart', {
		bannerPage: 'Cart',
		banner: 'Cart',
		user: req.user
	});
}

module.exports.postCart = (req, res, next) => {
	let productId = req.body.id;
	console.log(productId);
	let quantity = isNaN(req.body.quantity) ? 1 : req.body.quantity;
	productController
		.getProductById(productId)
		.then((product) => {
			let cartItem = req.session.cart.add(product, productId, quantity);
			// console.log(cartItem);
			res.json(cartItem);
		})
		.catch((err) => next(err));
}

module.exports.putCart = (req, res, next) => {
	let productId = req.body.id;
	let quantity = parseInt(req.body.quantity);
	let cartItem = req.session.cart.update(productId, quantity);
	res.json(cartItem);
}

module.exports.deleteCart = (req, res, next) => {
	let productId = req.body.id;
	req.session.cart.remove(productId);
	res.json({
		totalQuantity: req.session.cart.totalQuantity,
		totalPrice: req.session.cart.totalPrice,
	});
}

module.exports.deleteAll = (req, res) => {
	req.session.cart.empty();
	res.sendStatus(204);
	res.end();
};

module.exports.getTrackingOrder = (req, res) => {
	let cart = req.session.cart;
	res.render('tracking-order', {
		bannerPage: 'Order confirm',
		banner: 'Shop category',
		cart,
		user: req.user
	});
}

module.exports.postTrackingOrder = async(req, res, next) => {
	let orderInfo = {
		cart: req.session.cart,
		userId: req.user._id,
		address: req.body.address,
		phone: req.body.phone,
	}
	let order = await Order.create(orderInfo);
	if(!order){
		return next(new AppError("Cannot create order", 403));
	}
	req.session.cart = null;
	res.redirect('/cart/success-order')
}

module.exports.getSuccessOrder = (req, res) => {
	res.render('success-order', {
		bannerPage: 'Order confirm',
		banner: 'Shop category',
	});
}