const express = require('express');
const router = express.Router();
const { createNotification, getNotifications, getNotificationByUser } = require('../controllers/notificationController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

// Route: Create a new notification (Admin only)
router.post('/', verifyAccessToken, authorizeRoles("ADMIN"), createNotification);

// Route: Get all notifications (Admin and Staff only)
router.get('/', verifyAccessToken, authorizeRoles("ADMIN", "STAFF"), getNotifications);

// Route: Get notifications for a specific user (User and Admin only)
router.get('/user', verifyAccessToken, authorizeRoles("ADMIN", "USER"), getNotificationByUser);

module.exports = router;
