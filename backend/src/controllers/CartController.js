const Cart = require('../models/Cart');
const Product = require('../models/Product');


// Get cart by userId
const getCart = async (req, res) => {
    const userId = req.params.userId;
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
    const userId = req.params.userId;
    try {
        const cart = await Cart.update({
            where: {
                userId: userId
            }
        });
        return res.send(cart);
    } catch (error) {
        return res.status(500).send(error);
    }
}

// Create orders from products selected in cart , products selected is parameter
const cartToOrder = async (req, res) => {
    const userId = req.params.userId;
    const { products } = req.body;
    try {
        const cart = await Cart.findOne({
            where: {
                userId: userId
            },
            include: Product,
            attributes: ['quantity', "price"]
        });

        const order = await Order.create({
            userId: userId,
            status: 'pending',
            totalPrice: 0,
        });

        let totalPrice = 0;

        for (const selectedProduct of products) {
            const cartProduct = cart.Products.find(product => product.productId === selectedProduct.productId);
            if (cartProduct) {
                totalPrice += cartProduct.price * selectedProduct.quantity;
                await OrderProduct.create({
                    orderId: order.orderId,
                    productId: selectedProduct.productId,
                    quantity: selectedProduct.quantity,
                    price: cartProduct.price
                });

                await CartProduct.destroy({
                    where: {
                        cartId: cart.cartId,
                        productId: selectedProduct.productId
                    }
                });

            }
        }
        order.totalPrice = totalPrice;
        await order.save();
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).send(error);
    }
}



module.exports = {
    getCart,
    updateCart,
    cartToOrder,
}