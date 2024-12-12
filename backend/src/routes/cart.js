const express = require('express');
const router = express.Router();
const { getCart, updateCart, cartToOrder } = require('../controllers/cartController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');

// Route: Get cart by userId (only the user can access their cart)
router.get('/:userId', verifyAccessToken, (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json({ message: 'Bạn không có quyền!' });
    }
    next();
}, getCart);

// Route: Update cart by userId (only the user can update their cart)
router.patch('/:userId', verifyAccessToken, (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json({ message: 'Bạn không có quyền!' });
    }
    next();
}, updateCart);

// Route: Convert cart to order (only the user can perform this action)
router.post('/:userId/order', verifyAccessToken, (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json({ message: 'Bạn không có quyền!' });
    }
    next();
}, cartToOrder);

module.exports = router;
