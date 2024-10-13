const userRouter = require('./user');

exports.route = (app) => {
    app.use('/api/user', userRouter);
};