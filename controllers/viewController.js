module.exports.getDashboard  = (req, res) => {
    res.render('index')
}

module.exports.getProductTable = (req, res) => {
    res.render('tables-list-products')
}