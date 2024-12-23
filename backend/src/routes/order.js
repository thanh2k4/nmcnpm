const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, deleteOrder, updateOrder, getOrdersByUserId, getOrdersByUser } = require('../controllers/OrderController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

// Route: Create a new order
router.post('/', verifyAccessToken, authorizeRoles("USER", "ADMIN", "STAFF"), createOrder);

// Route: Get all orders (Admin and Staff only)
router.get('/', verifyAccessToken, authorizeRoles("ADMIN", "STAFF"), getOrders);

// Route: Get orders by current user (only the user can access their own orders)
router.get('/user', verifyAccessToken, getOrdersByUser);

// Route: Get all orders by user id (Admin and Staff only)
router.get('/user/:userId', verifyAccessToken, authorizeRoles("ADMIN", "STAFF"), getOrdersByUserId);

// Route: Get an order by id (Admin, Staff, or the User)
router.get('/:id', verifyAccessToken, authorizeRoles("ADMIN", "STAFF", "USER"), getOrderById);

// Route: Delete an order by id (Admin only)
router.delete('/:id', verifyAccessToken, authorizeRoles("ADMIN"), deleteOrder);

// Route: Update an order by id (Admin and Staff only)
router.patch('/:id', verifyAccessToken, authorizeRoles("ADMIN", "STAFF"), updateOrder);

module.exports = router;

