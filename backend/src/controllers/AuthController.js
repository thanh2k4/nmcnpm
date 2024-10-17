const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');


// Login with username password as parameter
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'Invalid username' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, secure: true
        })
        res.cookie('accessToken', accessToken, {
            httpOnly: true, secure: true
        })
        return res.status(200).json({ message: 'Login successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Logout and clear refresh token
const logout = async (req, res) => {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    return res.status(200).json({ message: 'Logout successfully' });
}

// Allowcate new access token
const allowcateAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(403).json({ message: 'Refresh token not found' });
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }
            const accessToken = generateAccessToken(user);
            res.cookie('accessToken', accessToken, {
                httpOnly: true, secure: true
            })
            return res.status(200).send({ message: 'Access token allowcated' });
        });
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
}

module.exports = { login, logout, allowcateAccessToken };