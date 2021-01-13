
const catchAsync = require('./../utils/catchAsync');
const Product = require('./../models/productModel');
const User = require('./../models/userModel')
const Brand = require('./../models/brandModel');
const Category = require('./../models/categoryModel');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const request = require('request')

const USER_SERVER_URL = 'http://localhost:3000';

module.exports.getOverview = catchAsync(async (req, res, next) => {
	if (req.user) {
		res.render('index', {
		})
	} else {
		res.redirect('/sign-in')
	}

});

module.exports.getProductTable = catchAsync(async (req, res, next) => {
	const products = await Product.find();

	res.render('product-table', {
		products,
	})
})

module.exports.getProductForm = catchAsync(async (req, res, next) => {
	const brands = await Brand.find();
	const categories = await Category.find();

	res.render('product-form', { brands, categories });
})

module.exports.postProductForm = catchAsync(async (req, res, next) => {
	const form = new formidable.IncomingForm();
	form.parse(req, async function (err, fields, files) {
		if (err) {
			console.error(err.message);
			return;
		}
		fields.imageCover = files.image.name;
		fields.brandId = fields.brandId;
		fields.categoryId = parseInt(fields.categoryId);
		fields.price = parseFloat(fields.price);
		fields.images = [`${files.image.name}`]
		let newPath = path.join(__dirname, `/../public/assets/images/products/${files.image.name}`)
		fs.copyFile(files.image.path, newPath, function (err) {
			if (err) throw err;
		});
		await Product.create(fields);
		res.redirect('/products')
	});

	form.on('file', function (name, file) {
		let formData = {
			file: {
				value: fs.createReadStream(file.path),
				options: {
					filename: file.name
				}
			}
		};
		const postUrl = USER_SERVER_URL + '/upload'
		request.post({ url: postUrl, formData: formData }, function (err, httpResponse, body) {
			console.log(err);
			console.log(httpResponse);
			console.log(body)
		});
		console.log(file.path);
	})
	
});

module.exports.getUserTable = catchAsync(async (req, res, next) => {
	const users = await User.find();

	res.render('user-table', {
		users
	})
})


module.exports.getBrandTable = catchAsync(async (req, res, next) => {
	const brands = await Brand.find();
	for (let [index, brand] of brands.entries()) {
		brands[index].quantity = await Product.countDocuments({ brandId: brand._id })
	}
	res.render('brand-table', { brands })
})

module.exports.getBrand = catchAsync(async (req, res, next) => {
	const brand = await Brand.findOne({ _id: req.params.id })
	res.status(200).render('brand-form', {
		brand,
		type: Boolean(req.flash('success')[0])
	})
})

module.exports.postBrand = async (req, res, next) => {
	const updateInfo = req.body;
	const brand = await Brand.findByIdAndUpdate(req.params.id, updateInfo);
	if (brand) {
		req.flash('success', 'Success')
	}
	res.redirect(`/brands/${req.params.id}`)
}

module.exports.deleteBrand = catchAsync(async (req, res, next) => {
	await Brand.findByIdAndDelete(req.params.id);
	res.redirect('/brands')
})

module.exports.getBrandForm = catchAsync(async (req, res, next) => {
	res.status(200).render('brand-form', {
	})
})

module.exports.postBrandForm = async (req, res, next) => {
	const brand = await Brand.create(req.body);
	if (brand) {
		res.redirect(`/brands`)
	}
	next();
}

module.exports.getProductFromBrand = async(req, res) => {
	const brandId = req.params.id;
	const products = await Product.find({brandId: brandId});
	res.render('product-table', {
		products,
	})
}

module.exports.getProduct = async(req, res, next) => {
	const product = await Product.findOne({_id: req.params.id})
	const brands = await Brand.find();
	const categories = await Category.find();
	const type = req.flash('success')[0];
	if(product){
		res.render('product-form', {product, brands, categories, brandId: product.brandId._id, type})
	}
}

module.exports.postProduct = async(req, res, next) => {
	const form = new formidable.IncomingForm();
	form.parse(req, async function (err, fields, files) {
		if (err) {
			console.error(err.message);
			return;
		}
		if(fields.brandId)
			fields.brandId = fields.brandId;
		if(fields.categoryId)
			fields.categoryId = parseInt(fields.categoryId);
		fields.price = parseFloat(fields.price);
		fields.warehouse = parseInt(fields.warehouse);
		if(files.image.size > 0){
			fields.imageCover = files.image.name;
			fields.images = [`${files.image.name}`]
			let newPath = path.join(__dirname, `/../public/assets/images/products/${files.image.name}`)
			fs.copyFile(files.image.path, newPath, function (err) {
				if (err) throw err;
			});
		}
		await Product.findByIdAndUpdate(req.params.id,fields);
		
	});

	form.on('file', function (name, file) {
		if(file.size > 0){
			let formData = {
				file: {
					value: fs.createReadStream(file.path),
					options: {
						filename: file.name
					}
				}
			};
			const postUrl = USER_SERVER_URL + '/upload'
			request.post({ url: postUrl, formData: formData }, function (err, httpResponse, body) {
				console.log(err);
				console.log(httpResponse);
				console.log(body)
			});
			console.log(file.path);
		}
	})
	req.flash('success', 'Success')
	res.redirect(`/products/${req.params.id}`)
}

module.exports.deleteProduct = async(req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	res.redirect('/products')
}