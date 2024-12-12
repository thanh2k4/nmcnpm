const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');

// Route: User login
router.post('/login', login);

// Route: User logout 
router.post('/logout', verifyAccessToken, logout);

module.exports = router;
