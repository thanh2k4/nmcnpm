const express = require('express');
const router = express.Router();
const { createNotification, getNotifications, getNotificationByUser } = require('../controllers/notificationController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');

// Route: Create a new notification
router.post('/', verifyAccessToken, createNotification);

// Route: Get all notifications (for admins)
router.get('/', verifyAccessToken, getNotifications);

// Route: Get notifications for a specific user (only the user and admins can access their notifications)
router.get('/user', verifyAccessToken, getNotificationByUser);

module.exports = router;
