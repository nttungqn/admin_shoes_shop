const Admin = require('../models/adminModel');
const Order = require('../models/orderModel');

module.exports.getAccount = (req, res) => {
    res.status(200).render('admin-profile', {
        type: Boolean(req.flash('success')[0])
    })
}

module.exports.postAccount = async(req, res, next) => {
    const updateInfo = req.body;
    const admin = await Admin.findByIdAndUpdate(req.user._id, updateInfo);
    if(admin){
        req.flash('success', 'Success')
        req.user = admin
    }
    res.redirect('/account')
}

// module.exports.getChangePassword = (req, res) => {
//     res.status(200).render('change-password', {
//         banner: 'Change password',
//         user: req.user
//     })
// }

// module.exports.postChangePassword = async (req, res, next) => {
//     const {currentPassword, newPassword, confirmPassword} = req.body;
//     const user = req.user;
//     let type = await user.correctPassword(currentPassword, user.password);
//     let alert;
//     if(!type) {
//         alert = {
//             type: 'danger',
//             message: 'The current password is incorrect.',
//         }
//         return res.status(404).render('change-password', {
//             banner: 'Change password',
//             user,
//             alert
//         })
//     }
//     user.password = newPassword;
//     user.save();
//     alert = {
//         type: 'success',
//         message: 'Update pasword successfully.',
//     }
//     return res.status(200).render('change-password', {
//         banner: 'Change password',
//         user,
//         alert
//     })
// }

// module.exports.getOrderList = async(req, res, next) => {
//     if(!req.user)
//         return next(new AppError('Please login to order', 404));
//     const orders = await Order.find({userId: req.user._id})
//     res.render('order-list', {
//         banner: 'Order list',
//         bannerPage: 'Order list',
//         orders
//     })
// }