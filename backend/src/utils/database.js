const { Sequelize } = require('sequelize');

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    }

);

module.exports = database;