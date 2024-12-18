const Cart = require('../models/Cart');
const Product = require('../models/Product');
const CartUpdateRequest = require('../dto/request/CartUpdateRequest');

// Get cart by userId
const getCart = async (req, res) => {
    const userId = req.user.userId;
    try {
        const cart = await Cart.findOne({
            where: {
                userId: userId
            },
            include: {
                model: Product,
                through: {
                    attributes: ['quantity', 'price']
                }
            }
        });
        return res.send(cart);
    } catch (error) {
        return res.status(500).send(error);
    }
}


// Update cart by userId
const updateCart = async (req, res) => {
    const userId = req.user.userId;
    const { products, cartData } = req.body;
    try {
        const cart = await Cart.findOne({ where: { userId: userId } });
        const cartUpdateData = new CartUpdateRequest(cartData);
        await cart.update(cartUpdateData);
        for (const product of products) {
            if (product.quantity === 0) {
                await cart.removeProduct(product.productId);
            } else {
                await cart.addProduct(product.productId, {
                    through: {
                        quantity: product.quantity,
                        price: product.price
                    }
                });
            }
        }
        return res.send(cart);
    } catch (error) {
        return res.status(500).send(error);
    }
}




module.exports = {
    getCart,
    updateCart
}