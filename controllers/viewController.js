
const catchAsync = require('./../utils/catchAsync');
const Product = require('./../models/productModel');
const User = require('./../models/userModel')
const Brand = require('./../models/brandModel');

// 1) Get tour data from collection
// 2) Build template
// 3) Render that template using tour data from 1)
const COMMENTS_PER_PAGE = 3;

module.exports.getOverview = catchAsync(async (req, res, next) => {
	if(req.user){
		res.render('index', {
		})
	}else {
		res.redirect('/sign-in')
	}
	
});

module.exports.getProductTable = catchAsync(async (req, res, next) => {
	const products = await Product.find();
	
	res.render('product-table', {
		products,
	})
})

module.exports.getUserTable = catchAsync(async (req, res, next) => {
	const users = await User.find();
	
	res.render('user-table', {
		users
	})
})


module.exports.getBrandTable = catchAsync(async (req, res, next) => {
	const brands = await Brand.find();
	for (let [index, brand] of brands.entries()) {
		brands[index].quantity = await Product.countDocuments({brandId: brand._id})
	}
	res.render('brand-table', {brands})
})

module.exports.getBrand = catchAsync(async (req, res, next) => {
	const brand = await Brand.findOne({_id: req.params.id})
	res.status(200).render('brand-detail', {
		brand,
        type: Boolean(req.flash('success')[0])
    })
})

module.exports.postBrand = async(req, res, next) => {
    const updateInfo = req.body;
    const brand = await Brand.findByIdAndUpdate(req.params.id, updateInfo);
    if(brand){
        req.flash('success', 'Success')
    }
    res.redirect(`/brands/${req.params.id}`)
}

module.exports.deleteBrand = catchAsync(async (req, res, next) => {
	await Brand.findByIdAndDelete(req.params.id);
	res.redirect('/brand-table')
})

// module.exports.getShopCategory = catchAsync(async (req, res, next) => {
// 	const categories = await Category.find();
// 	const brands = await Brand.find();
// 	const colors = await Color.find();
// 	const trendingProducts = await productController.getTrendingProduct(12);

// 	let options = {
// 		// price: {
// 		// 	$gte: query.min,
// 		// 	$lte: query.max,
// 		// },
// 		// name: {
// 		// 	$regex: query.search,
// 		// },
// 	};
	
// 	colorParam = parseInt(req.query.color) || 0;
// 	if (colorParam  > 0)
// 		options.colorId = colorParam;

// 	brandParam = parseInt(req.query.brand) || 0;
// 	if (brandParam  > 0)
// 		options.brandId = brandParam;
	
// 	categoeyParam = parseInt(req.query.categoey) || 0;
// 	if (categoeyParam  > 0)
// 		options.categoeyId = categoeyParam;

// 	minParam = parseInt(req.query.min) || 0;
// 	maxParam = parseInt(req.query.max) || 150;
// 	options.price =  {
// 		$gte: minParam,
// 		$lte: maxParam,
// 	}
	
// 	pageParam = parseInt(req.query.page) || 1;
// 	limitParam = parseInt(req.query.limit) || 9;
	
// 	let sortOpt = {};
// 	if (req.query.sort) {
// 		switch (req.query.sort) {
// 			case 'name':
// 				sortOpt.name = 'asc';
// 				break;
// 			case 'price':
// 				sortOpt.price = 'asc';
// 				break;
// 			case 'ratingsAverage':
// 				sortOpt.ratingsAverage = 'asc';
// 				break;
// 			default:
// 				sortOpt.name = 'asc';
// 				break;
// 		}
// 	}
	
// 	if (req.query.search == null || req.query.search.trim() == ''){
// 		req.query.search = '';
// 	}
// 	options.name = {
// 		$regex: req.query.search,
// 	}
// 	let offsetVal = (pageParam - 1) * limitParam;
// 	const totalProducts = await Product.find(options).sort(sortOpt);
// 	const products = totalProducts.slice(offsetVal, offsetVal + limitParam);
// 	const topProducts = await productController.getTopProducts(12);
// 	const topProduct1 = topProducts.slice(0, 3);
// 	const topProduct2 = topProducts.slice(3, 6);
// 	const topProduct3 = topProducts.slice(6, 9);
// 	const topProduct4 = topProducts.slice(9, 12);

// 	res.status(200).render('shop', {
// 		query: req.query,
// 		categories,
// 		brands,
// 		colors,
// 		trendingProducts,
// 		products,
// 		banner: 'Shop',
// 		bannerPage: 'Shop',
// 		totalPages: Math.ceil(totalProducts.length / limitParam),
// 		current: pageParam,
// 		pagination: {
// 			page: parseInt(pageParam),
// 			limit: parseInt(limitParam),
// 			totalRows: parseInt(totalProducts.length),
// 		},
// 		topProduct1,
// 		topProduct2,
// 		topProduct3,
// 		topProduct4,
// 	});
// });

// module.exports.getDetailProduct = catchAsync(async (req, res, next) => {
// 	const product = await Product.findOne({ _id: req.params.id });
	
// 	if (!product) {
// 		return next(new AppError('Not product found with that ID', 404));
// 	}
	
// 	const totalComments = await Comment.find({productId: req.params.id});
// 	const count = totalComments.length > 0 ? totalComments.length : undefined;
	
// 	if (req.query.page == null || isNaN(req.query.page)) {
// 		req.query.page = 1;
// 	}
	
// 	if (req.query.limit == null || isNaN(req.query.limit)) {
// 		req.query.limit = COMMENTS_PER_PAGE;
// 	}
// 	const comments = await commentController.getCommentByProductId(req.query, req.params.id);
	
// 	const topProduct1 = await productController.getProductsByBrandId(product.brandId, 3, 0);
// 	const topProduct2 = await productController.getProductsByBrandId(product.brandId, 3, 3);
// 	const topProduct3 = await productController.getProductsByBrandId(product.brandId, 3, 6);
// 	const topProduct4 = await productController.getProductsByBrandId(product.brandId, 3, 9);

// 	res.status(200).render('single-product', {
// 		product,
// 		comments,
// 		bannerPage: 'Shop Single',
// 		banner: 'Shop Single',
// 		topProduct1,
// 		topProduct2,
// 		topProduct3,
// 		topProduct4,
// 		current: req.query.page,
// 		pagination: {
// 			page: parseInt(req.query.page),
// 			limit: parseInt(req.query.limit),
// 			totalRows: parseInt(count),
// 		},
// 	});
// });
