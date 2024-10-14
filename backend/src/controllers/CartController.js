const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const cart = await Cart.findOne({
            where: {
                userId: userId
            },
            include: Product
        });
        res.send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
}

const createCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const cart = await Cart.create({
            userId: userId,
            totalPrice: 0
        });
        res.send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const cart = await Cart.update({
            where: {
                userId: userId
            }
        });
        res.send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        await Cart.destroy({
            where: {
                userId: userId
            }
        });
        res.send('Cart deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getCart,
    createCart,
    updateCart,
    deleteCart
}