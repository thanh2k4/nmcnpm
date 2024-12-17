const { DataTypes } = require('sequelize');
const database = require('../config/database');
const Product = require('./Product');
const Cart = require('./Cart');

const CartProduct = database.define('CartProduct', {
    cartId: {
        type: DataTypes.INTEGER,
        references: {
            model: Cart,
            key: 'cartId'
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'productId'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

module.exports = CartProduct;