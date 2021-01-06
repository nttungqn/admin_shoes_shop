const Comment = require('../models/commentModel');

module.exports.add = (comment) => {
	return new Promise((resolve, reject) => {
		Comment.create(comment)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new AppError(err)));
	});
};

module.exports.getCommentByProductId = (query, id) => {
	return new Promise((resolve, reject) => {
		if (query.limit > 0) {
			limitVal = parseInt(query.limit);
			offsetVal = parseInt(query.limit * (query.page - 1));
		}
		
		Comment.find({productId: id})
			.limit(limitVal)
			.skip(offsetVal)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(new AppError(err.message, 404)));
	})
}
