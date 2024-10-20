require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const database = require('./config/database');
const cookieParser = require('cookie-parser');
const createAdminUser = require('./utils/createAdminUser');

// Import all models
const { User, Cart, Order, Product, Review, Notification, OrderProduct, CartProduct } = require('./models/association');
const { route } = require('./routes');

const port = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sync database
database.sync({ alter: true }).then(() => {
    console.log('Database synced successfully');
    createAdminUser();
});
route(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});