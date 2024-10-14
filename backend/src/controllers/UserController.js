const User = require('../models/User');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        return res.status(204).send();
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update(req.body);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { createUser, getUsers, getUserById, deleteUser, updateUser };