const { DataTypes } = require('sequelize');
const database = require('../utils/database');
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
            len: [6, 20]
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
        allowNull: false,
        validate: {
            len: [8, 20],
            is: passwordValidationRegex
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,

    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    hooks: {
        beforeCreate: async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
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