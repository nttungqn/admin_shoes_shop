/** @format */

const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
	_id: {
		type: Number
	},
	name: {
		type: String,
	},
	image: {
		type: String,
		default: 'category-1.png',
	}
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
