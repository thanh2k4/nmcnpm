const express = require('express');
const router = express.Router();
const { getCart, updateCart, cartToOrder } = require('../controllers/cartController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');

router.get('/:userId', verifyAccessToken, (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json({ message: 'Bạn không có quyền!' });
    }
    next();
}, getCart);

router.patch('/:userId', verifyAccessToken, (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json({ message: 'Bạn không có quyền!' });
    }
    next();
}, updateCart);

router.post('/:userId/order', verifyAccessToken, (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json({ message: 'Bạn không có quyền!' });
    }
    next();
}, cartToOrder);

module.exports = router;
