const mongoose = require("mongoose");
const dateFormat = require("dateformat");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  cart: { type: Object, required: true },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  phone: {
    type: String,
    required: true
  },
  // 0: Cannceled 1: Pending 2: Completed
  status: {
    type: String,
    enum: ['pending', 'canceled', 'completed'],
    default: "pending"
  }
});

orderSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'userId',
		select: 'email name',
	});
	next();
})

module.exports = mongoose.model("Order", orderSchema, 'orders');
