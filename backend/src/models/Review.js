const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Review = database.define('Review', {
    reviewId: {
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
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'productId'
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    review: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

});

module.exports = Review;