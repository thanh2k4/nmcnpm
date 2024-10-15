const authController = require('../controllers/AuthController');
const express = require('express');
const router = express.Router();

router.post('/login', authController.login);

module.exports = router;