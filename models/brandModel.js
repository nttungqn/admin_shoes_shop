/** @format */

const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	image: {
		type: String,
	},
	products: [{type: mongoose.Schema.ObjectId, ref: 'Product'}]
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
