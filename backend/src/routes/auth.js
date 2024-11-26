const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');

// Route: User login
router.post('/login', login);

// Route: User logout
router.post('/logout', logout);

module.exports = router;
