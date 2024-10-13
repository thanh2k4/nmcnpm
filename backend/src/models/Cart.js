const { DataTypes } = require('sequelize');
const database = require('../utils/database');
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Cart;