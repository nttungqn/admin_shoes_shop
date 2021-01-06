const User = require('./../models/userModel');
const Order = require('./../models/orderModel');

module.exports.getAccount = (req, res) => {
    res.status(200).render('user-profile', {
        banner: 'User profile',
        user: req.user
    })
}

module.exports.postAccount = (req, res, next) => {
    const updateInfo = req.body;
    const user = User.findByIdAndUpdate(req.user.id, updateInfo);
    
    if(!user){
        next(new AppError('Update user not successful', 404));
    }
    
    res.status(200).render('user-profile', {
        banner: 'User profile',
        user: req.user,
        type: true
    })
}

module.exports.getChangePassword = (req, res) => {
    res.status(200).render('change-password', {
        banner: 'Change password',
        user: req.user
    })
}

module.exports.postChangePassword = async (req, res, next) => {
    const {currentPassword, newPassword, confirmPassword} = req.body;
    const user = req.user;
    let type = await user.correctPassword(currentPassword, user.password);
    let alert;
    if(!type) {
        alert = {
            type: 'danger',
            message: 'The current password is incorrect.',
        }
        return res.status(404).render('change-password', {
            banner: 'Change password',
            user,
            alert
        })
    }
    user.password = newPassword;
    user.save();
    alert = {
        type: 'success',
        message: 'Update pasword successfully.',
    }
    return res.status(200).render('change-password', {
        banner: 'Change password',
        user,
        alert
    })
}

module.exports.getOrderList = async(req, res, next) => {
    if(!req.user)
        return next(new AppError('Please login to order', 404));
    const orders = await Order.find({userId: req.user._id})
    res.render('order-list', {
        banner: 'Order list',
        bannerPage: 'Order list',
        orders
    })
}