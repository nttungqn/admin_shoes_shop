const passport = require('passport');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring')
const AppError = require('./../utils/AppError')
const User = require('./../models/userModel')

module.exports.getLogin = (req, res) => {
	req.session.returnURL = req.query.returnURL;
	res.render('login', {
		banner: 'Log In',
		message: req.flash('error')[0] || '',
	});
}

module.exports.postLogin = (req, res, next) => {
	passport.authenticate('local-login', {
		successRedirect: req.session.returnURL || '/',
		failureRedirect: '/login',
		failureFlash: true
	})(req, res, next);
}

module.exports.logout = (req, res) => {
	if (req.session.cart) {
		req.session.cart = null;
	}
	req.logout();
	res.redirect("/")
}

module.exports.getSignUp = (req, res) => {
	res.status(200).render('sign-up', {
		banner: 'Sign up',
		message: req.flash('error')[0] || '',
	});
}

module.exports.postSignUp = (req, res, next) => {
	passport.authenticate('local-signup', {
		successRedirect: '/verify-account',
		failureRedirect: '/sign-up',
		failureFlash: true
	})(req, res, next);
}

module.exports.protect = (req, res, next) => {
	if (req.user){
		if(req.user.isAuthenticated)
			return next();
		return next(new AppError('Your account has not be authenicated.', 401))
	}
	return next(new AppError('You are not logged in! Please log in to get access.', 401))
}


module.exports.getVerifyAccount = (req, res, next) => {
	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'ttpro2015@gmail.com',
			pass: 'sulropcniqutyenq'
		}
	});

	const verify_token = randomstring.generate({
		length: 6,
		charset: 'alphabetic'
	})

	var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
		from: 'admin',
		to: req.user.email,
		subject: 'Verify sign up',
		text: 'You recieved message from Aroma shop',
		html: `<p>Thank you for sign up to Aroma shop. Your infomation on below</b><ul><li>Name: ${req.user.name}</li><li>Email: ${req.user.email}</li>Your code to verify: ${verify_token}</ul>`
	}
	transporter.sendMail(mainOptions, (err, info) => {
		if (err) {
		  console.log(err);
		} else {
		  console.log("Sent:" + info.response);
		}
	  });
	user = req.user;
	user.verify_token = verify_token;
	user.save();
	
	res.render("verify-account", {
		banner: "Verify account",
		user: req.user,
	});
}

module.exports.postVerifyAccount = (req, res) => {
	const {verify_token} = req.body
	
	const user = req.user;
	if(user.verify_token == verify_token) {
		user.isAuthenticated = true;
		user.save();
		res.redirect('/');
	}else {
		res.render("verify-account", {
			banner: "Verify account",
			user: req.user,
		});
	}
}

module.exports.getSendPasswordReset = async(req, res) => {
	const message = req.flash('error')[0];
	
	res.render("send-password-reset", {
		banner: "Password reset",
		message,
	});
}

module.exports.postSendPasswordReset = async(req, res) => {
	const email = req.body.email;
	const user = await User.findOne({email: email});
	if(!user){
		req.flash("error", "Email does not exist!");
		return res.redirect('/send-password-reset');
	}
	
	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'ttpro2015@gmail.com',
			pass: 'sulropcniqutyenq'
		}
	});

	const verify_token = randomstring.generate({
		length: 6,
		charset: 'alphabetic'
	})

	var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
		from: 'admin',
		to: user.email,
		subject: 'Verify sign up',
		text: 'You recieved message from Aroma shop',
		html: `<p>Hi ${user.name}</p><p>We received a request to access your account ${user.email} through your email address.</p><p>Your verify code: <h3>${verify_token}</h3></p>`
	}
	transporter.sendMail(mainOptions, (err, info) => {
		if (err) {
		  console.log(err);
		} else {
		  console.log("Sent:" + info.response);
		}
	  });
	user.verify_token = verify_token;
	user.save();
	
	return res.redirect(`/confirm-password-reset?email=${email}`)
}


module.exports.getConfirmPasswordReset = (req, res) => {
	const message = req.flash('error')[0];
	res.render('confirm-password-reset', {
		banner: 'Passwords reset',
		message: message,
		email: req.query.email
	})
}

module.exports.postConfirmPasswordReset = async(req, res) => {
	const email = req.query.email;
	const {verify_token, newPassword} = req.body;
	const user = await User.findOne({ email: email });
	
	if(user.verify_token !== verify_token) {
		req.flash("error", "Authentication error codes!");
		return res.redirect(`/confirm-password-reset?email=${email}`)
	}
	
	user.password = newPassword;
	user.save();
	res.redirect('/login');
}
