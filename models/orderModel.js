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
    default: "Pending"
  }
});

orderSchema.pre(/^find/, function (next) {
	this.createdAt = dateFormat(this.createdAt, "dS mmmm, yyyy, at h:MM TT");
	next();
})

module.exports = mongoose.model("Order", orderSchema, 'orders');
