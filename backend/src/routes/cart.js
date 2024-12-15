const express = require('express');
const router = express.Router();
const { getCart, updateCart, cartToOrder } = require('../controllers/CartController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

router.get('/', verifyAccessToken, getCart);

router.patch('/', verifyAccessToken, updateCart);

router.post('/', verifyAccessToken, cartToOrder);

module.exports = router;
