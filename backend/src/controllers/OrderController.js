const OrderUpdateRequest = require('../dto/request/OrderUpdateRequest');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { products, orderData } = req.body;
        const userId = req.user.userId;
        orderData.userId = userId;
        const order = await Order.create(orderData);
        for (const product of products) {
            await order.addProduct(product.productId, {
                through: {
                    quantity: product.quantity,
                    price: product.price
                }
            });
        }
        res.status(200).json(order);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}


// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get an order by id
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{
                model: Product,
                through: {
                    attributes: ['quantity', 'price']
                }
            }]
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete an order by id
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.status === 'delivered') {
            return res.status(400).json({ message: 'Order already delivered' });
        }
        await order.destroy();
        return res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update an order by id
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const { products, ...orderData } = req.body;
        const orderUpdateData = new OrderUpdateRequest(orderData);
        await order.update(orderUpdateData);
        await order.setProducts(products.map(product => product.productId), {
            through: {
                quantity: products.map(product => product.quantity),
                price: products.map(product => product.price)
            }
        });
        return res.status(200).json(order);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all orders by user id 
const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                userId: req.params.userId
            },
            include: [{
                model: Product,
                through: {
                    attributes: ['quantity', 'price']
                }
            }]
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get user order by themselves
const getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                userId: req.user.id
            },
            include: [{
                model: Product,
                through: {
                    attributes: ['quantity', 'price']
                }
            }]
        });
        return res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder,
    updateOrder,
    getOrdersByUserId,
    getOrdersByUser
};