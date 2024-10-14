const userRouter = require('./user');

exports.route = (app) => {
    app.use('/users', userRouter);
};