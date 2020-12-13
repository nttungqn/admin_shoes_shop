const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please provide a fullname'],
	},
	image: {
		type: String,
		default: 'avatar-1.png',
	},
	email: {
		type: String,
		unique: true,
		require: [true, 'Please provide your mail'],
	},
	password: {
		type: String,
		require: [true, 'Please provide a password'],
	},
	address: { 
		type: String,
		default: '225 Nguyen Van Cu Street',
	},
	salt: {
		type: String
	}
});

// gensalt
userSchema.pre('save', async function(next) {
	this.salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, this.salt);
	next();
  });
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
