require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const database = require('./utils/database');
const cookieParser = require('cookie-parser');

// Import all models
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const CartProduct = require('./models/CartProduct');
const Order = require('./models/Order');
const OrderProduct = require('./models/OrderProduct');
const Review = require('./models/Review');
const Notification = require('./models/Notification');

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
database.sync({ alter: true });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});