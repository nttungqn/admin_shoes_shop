const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    }
});

orderDetailSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'productId',
		select: 'name price imageCover',
    });
    this.populate({
        path: 'orderId',
        select: ''
    })
	next();
})

module.exports = mongoose.model("OrderDetail", orderDetailSchema, 'orders-detail');
