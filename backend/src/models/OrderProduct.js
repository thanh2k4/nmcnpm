const { DataTypes } = require('sequelize');
const database = require('../utils/database');
const Product = require('./Product');
const Order = require('./Order');


const OrderProduct = database.define('OrderProduct', {
    orderProductId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'orderId'
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
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});