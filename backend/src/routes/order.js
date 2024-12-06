const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, deleteOrder, updateOrder, getOrdersByUserId, getOrdersByUser } = require('../controllers/orderController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

// Route: Create a new order
router.post('/', verifyAccessToken, authorizeRoles("USER", "ADMIN"), createOrder);

// Route: Get all orders (Admin only)
router.get('/', verifyAccessToken, authorizeRoles("ADMIN"), getOrders);

// Route: Get all orders by user id (Admin only)
router.get('/user/:userId', verifyAccessToken, authorizeRoles("ADMIN"), getOrdersByUserId);

// Route: Get orders by current user (only the user can access their own orders)
router.get('/user', verifyAccessToken, getOrdersByUser);

// Route: Get an order by id
router.get('/:id', verifyAccessToken, authorizeRoles("ADMIN", "USER"), getOrderById);

// Route: Delete an order by id (Admin only)
router.delete('/:id', verifyAccessToken, authorizeRoles("ADMIN"), deleteOrder);

// Route: Update an order by id (Admin only)
router.patch('/:id', verifyAccessToken, authorizeRoles("ADMIN"), updateOrder);



module.exports = router;
