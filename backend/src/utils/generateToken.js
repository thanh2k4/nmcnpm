const jwt = require('jsonwebtoken');

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
}

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
}

module.exports = { generateRefreshToken, generateAccessToken };