const { DataTypes } = require('sequelize');
const database = require('../config/database');
const bcrypt = require('bcrypt');

const phoneValidationRegex = /\d{10}/;
const passwordValidationRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$])[0-9a-zA-Z!@#$]+$/;

const User = database.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 20]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: phoneValidationRegex
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER'
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password.length > 20 || user.password.length < 8) {
                throw new Error('Password must be between 8 and 20 characters');
            }
            if (!passwordValidationRegex.test(user.password)) {
                throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one number and one special character');
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;

        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                if (user.password.length > 20 || user.password.length < 8) {
                    throw new Error('Password must be between 8 and 20 characters');
                }
                if (!passwordValidationRegex.test(user.password)) {
                    throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one number and one special character');
                }
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        },
        afterCreate: async (user) => {
            if (user.role === 'USER') {
                const Cart = require('./Cart');
                await Cart.create({ userId: user.userId, totalPrice: 0 });
            }
        }
    },
    indexes: [
        {
            unique: true,
            fields: ['email']
        },
        {
            unique: true,
            fields: ['phoneNumber']
        },
        {
            unique: true,
            fields: ['username']
        }
    ]
});

module.exports = User;