const { Op } = require('sequelize');
const Notification = require('../models/Notification');

// Create a new notification
const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get user notifications by themselves
const getNotificationByUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const notification = await Notification.findAll({
            where: {
                [Op.or]: [
                    { userId: userId },
                    { userId: 0 }
                ]
            }
        });
        return res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createNotification, getNotifications, getNotificationByUser };