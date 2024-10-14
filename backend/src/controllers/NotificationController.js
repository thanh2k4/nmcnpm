const Notification = require('../models/Notification');

const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        return res.status(200).json(notification);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createNotification, getNotifications, getNotificationById };