const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder,
    updateOrder
} = require('../controllers/orderController');

router.post('/', createOrder);

router.get('/', getOrders);

router.get('/:id', getOrderById);

router.put('/:id', updateOrder);

// Route xóa đơn hàng theo ID
router.delete('/:id', deleteOrder);

module.exports = router;
