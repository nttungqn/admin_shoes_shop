const mongoose = require("mongoose");
const dateFormat = require('dateformat');


const commentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: { 
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: [true, "Comment not empty"],
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: [true, "Comment must belong a product"],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		avatar: {
			type: String,
			default: "avatar-default.png",
		},
		createdAtFormat: {
			type: String,
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

commentSchema.pre('save', function (next) {
	this.createdAtFormat = dateFormat(this.createdAt, "dS mmmm, yyyy, at h:MM TT");
	next();
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
