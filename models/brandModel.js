const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	name: {
		type: String,
	},
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
