const User = require('./../models/userModel')

module.exports.getUser = async(req, res) => {
    const id = req.params.id;
    const user = await User.findOne({_id: id});
    
    res.status(200).render('user-form', {
        user,
        type: Boolean(req.flash('success')[0])
    })
}

module.exports.postUser = async(req, res) => {
    const updateInfo = req.body;
    updateInfo.isLock = updateInfo.isLock ? true : false ;
    const user = await User.findByIdAndUpdate(req.params.id, updateInfo);
    if(user){
        req.flash('success', 'Success')
    }
    res.redirect(`/users/${req.params.id}`);
}