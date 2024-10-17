const authController = require('../controllers/AuthController');
const express = require('express');
const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;