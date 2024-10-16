const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login with username password as parameter
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Logout and clear refresh token
const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'Logout' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { login }