const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please provide a fullname'],
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
	phone: {
		type: String,
		default: DEFAULT_PHONE_NUMBER
	},
	isAuthenticated: {
		type: Boolean,
		required: false,
		default: false
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
