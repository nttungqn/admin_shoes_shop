/** @format */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	_id: {
		type: Number,	
	},
	name: {
		type: String,
	},
	image: {
		type: String,
	}
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
