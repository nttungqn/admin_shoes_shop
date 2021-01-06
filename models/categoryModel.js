/** @format */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
