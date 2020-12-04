/** @format */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes')


const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));


// use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(morgan('dev'));

app.use('/', viewRouter);
app.use('/api/v1/products', productRouter)


app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
