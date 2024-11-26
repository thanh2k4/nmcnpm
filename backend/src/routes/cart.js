const express = require('express');
const router = express.Router();
const { getCart, updateCart, cartToOrder } = require('../controllers/cartController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

// Route: Get cart by userId
router.get('/:userId', verifyAccessToken, getCart);

// Route: Update cart by userId
router.patch('/:userId', verifyAccessToken, updateCart);

// Route: Convert cart to order
router.post('/:userId/order', verifyAccessToken, cartToOrder);

module.exports = router;
