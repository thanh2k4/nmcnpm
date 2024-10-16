const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = require('./User');

const Order = database.define('Order', {
    orderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        },
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING'
    },

    createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    shippingMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },

    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },

    address: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = Order;