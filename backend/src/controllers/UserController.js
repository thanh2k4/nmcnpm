
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');
const { instanceToPlain } = require('class-transformer');
const UserCreationRequest = require('../dto/request/UserCreationRequest');
const UserResponse = require('../dto/response/UserResponse');
const User = require('../models/User');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');


// Create a new user
const createUser = async (req, res) => {
    try {
        const userCreationRequest = new UserCreationRequest(req.body);
        const userData = instanceToPlain(userCreationRequest);
        try {
            verifyAccessToken(req, res, next);
        } catch (err) {
        }
        if (req.user.role === 'ADMIN' && userData.role) {
            userData.role = req.body.role;
            await User.create(userData);
        } else {
            const user = await User.create(userData);
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, secure: true
            })
            res.cookie('accessToken', accessToken, {
                httpOnly: true, secure: true
            });
        }
        return res.status(200).send({ message: 'User created successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        const usersResponse = users.map(user => new UserResponse(user.dataValues));
        return res.status(200).json(usersResponse);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Get a user by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(new UserResponse(user.dataValues));
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        console.log(JSON.stringify(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        return res.status(204).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Update user by themselves
const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(JSON.stringify(user));
        await user.update(req.body);

        return res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Get user profile by themselves
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userResponse = new UserResponse(user.dataValues);
        return res.status(200).json(userResponse);

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = { createUser, getUsers, getUserById, deleteUser, updateUser, getUserProfile };