const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Review = require('./Review');
const Cart = require('./Cart');
const Notification = require('./Notification');
const CartProduct = require('./CartProduct');
const OrderProduct = require('./OrderProduct');

// User-Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// User-Notification
User.hasMany(Notification, { foreignKey: 'userId', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'userId' });

// User-Cart
User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// User-Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Product-Review
Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productId' });

// Product-Order
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId', onDelete: 'CASCADE' });

// Cart-Product
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'productId', onDelete: 'RESTRICT' });
Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'cartId' });

module.exports = { User, Product, Order, Review, OrderProduct, Cart, Notification, CartProduct };