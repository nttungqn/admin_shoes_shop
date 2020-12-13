const Product = require('./../models/productModel')
const catchAsync = require('./../utils/catchAsync')

module.exports.getDashboard  = (req, res) => {
    res.render('index')
}

module.exports.getProductTable = catchAsync(async(req, res) => {
    const product = await Product.find();
    res.render('tables-list-products', { 
        product
    })
});