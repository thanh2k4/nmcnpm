const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = require('./User');

const Cart = database.define('Cart', {
    cartId: {
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
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
});

module.exports = Cart;