const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			text: true,
			required: [true, 'A shoes must have a name'],
			unique: false,
			maxlength: [50, 'A shoes name must have less or equal than 50 characters'],
			minlength: [3, 'A shoes name must have more or equal than 6 characters'],
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, 'Rating must be above 1.0'],
			max: [5, 'Rating must be below 5.0'],
			set: (val) => Math.round(val * 10) / 10, // 4.6667, 47, 4.7
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		size: {
			type: [String],
			required: true,
		},
		price: {
			type: Number,
			required: [true, 'A shoes must have a price'],
		},
		warehouse: {
			type: Number,
			default: 100
		},
		description: {
			type: String,
		},
		summary: { type: String },
		imageCover: {
			type: String,
			required: [true, 'A shoes must have a image cover'],
		},
		brandId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Brand',
			required: [true, 'Product must belong to a brand'],
		},
		categoryId: {
			type: Number,
			ref: 'Category',
			required: [true, 'Product must belong to a category'],
		},
		colorId: [
			{
				type: Number,
				ref: 'Category',
				required: [true],
			},
		],
		images: [String],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// productSchema.index({ name: 'text' });
// // productSchema.index({ '$**': 'text' });

productSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'brandId',
		select: 'name',
	});

	this.populate({
		path: 'categoryId',
		select: 'name',
	});

	this.populate({
		path: 'colorId',
		select: 'name',
	});

	next();
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
