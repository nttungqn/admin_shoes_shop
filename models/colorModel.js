/** @format */

const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
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

const Color = mongoose.model('Color', colorSchema, 'colors');

module.exports = Color;
