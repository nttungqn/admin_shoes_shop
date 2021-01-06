const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

DEFAULT_ADDRESS = '225 Nguyen Van Cu Street';
DEFAULT_PHONE_NUMBER = '0905500456';
let randomNumber = Math.floor(Math.random() * (3 - 1 + 1) ) + 1;
DEFAULT_AVATAR = `avatar-${randomNumber}.png`;

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please provide a fullname'],
	},
	image: {
		type: String,
		default: DEFAULT_AVATAR,
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
		default: DEFAULT_ADDRESS,
	},
	salt: {
		type: String
	},
	phone: {
		type: String,
		default: DEFAULT_PHONE_NUMBER
	},
	isAuthenticated: {
		type: Boolean,
		required: false,
		default: false
	},
	isLock: {
		type: Boolean,
		required: false,
		default: false
	},
	verify_token: {
		type: String,
		required: false
	},
});

// gensalt
adminSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, this.salt);
	next();
  });

  
const Admin = mongoose.model('Admin', adminSchema, 'admins');

module.exports = Admin;
