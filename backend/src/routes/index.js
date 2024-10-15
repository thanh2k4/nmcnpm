const userRouter = require('./user');
const authRouter = require('./auth');

exports.route = (app) => {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
};