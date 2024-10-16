const { Op } = require('sequelize');
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

const getNotificationByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const notification = await Notification.findAll({
            where: {
                [Op.or]: [
                    { userId: id },
                    { userId: 0 }
                ]
            }
        });
        return res.status(200).json(notification);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createNotification, getNotifications, getNotificationById };