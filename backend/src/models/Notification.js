const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = require('./User');

const Notification = database.define('Notification', {
    notificationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Notification;