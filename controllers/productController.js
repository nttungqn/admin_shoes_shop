const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');
const Product = require('./../models/productModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

module.exports.getTrendingProduct = (numItems) => {
	// treding products
	return new Promise((resolve, reject) => {
		Product.find()
			.sort({ ratingsAverage: 'desc' })
			.limit(numItems)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.getTopProducts = (numItems, skip = 0) => {
	return new Promise((resolve, reject) => {
		Product.find()
			.sort({ ratingsAverage: 'desc' })
			.limit(numItems)
			.skip(skip)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.getProductsByBrandId = (brandId, numItems, skip) => {
	return new Promise((resolve, reject) => {
		Product.find({ brandId: brandId })
			.limit(numItems)
			.skip(skip)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.getBestSellerProduct = (numItems) => {
	return new Promise((resolve, reject) => {
		Product.find()
			.sort({ ratingsQuantity: 'desc' })
			.limit(numItems)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};

module.exports.getAll = catchAsync(async (query) => {
	let options = {
		price: {
			$gte: query.min,
			$lte: query.max,
		},
		name: {
			$regex: query.search,
		},
	};

	let sortOpt = {};
	let limitVal, offsetVal;
	if (query.category > 0) {
		options.categoryId = query.category;
	}

	if (query.color > 0) {
		options.colorId = query.color;
	}

	if (query.brand > 0) {
		options.brandId = query.brand;
	}

	if (query.limit > 0) {
		limitVal = parseInt(query.limit);
		offsetVal = parseInt(query.limit * (query.page - 1));
	}

	if (query.sort) {
		switch (query.sort) {
			case 'name':
				sortOpt.name = 'asc';
				break;
			case 'price':
				sortOpt.price = 'asc';
				break;
			case 'ratingsAverage':
				sortOpt.ratingsAverage = 'asc';
				break;
			default:
				sortOpt.name = 'asc';
				break;
		}
	}
	
	const totalProducts = await Product.find(options).sort(sortOpt);
	const products = totalProducts.slice(offsetVal, offsetVal + limitVal);
	const length = totalProducts.length;
	return {products: products, length: length};
});

module.exports.getProductById = (id) => {
	return new Promise((resolve, reject) => {
		Product.findById(id)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new Error(err)));
	});
};
