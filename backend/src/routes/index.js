const userRouter = require('./user');
const authRouter = require('./auth');
const orderRouter = require('./order');
const productRouter = require('./product');
const reviewRouter = require('./review');
const noticeRouter = require('./notice');

exports.route = (app) => {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/orders', orderRouter);
    app.use('/products', productRouter);
    app.use('/reviews', reviewRouter);
    app.use('/notices', noticeRouter);
};