const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/generateToken');
const { getRefreshToken } = require('../utils/redisService');

const verifyAccessToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (!accessToken) {
            if (!refreshToken) {
                return res.status(403).json({ message: 'No access or refresh token found' });
            }

            const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const storedToken = await getRefreshToken(user.userId);
            if (storedToken !== refreshToken) {
                return res.status(403).json({ message: 'Refresh Token is invalid' });
            }
            const newAccessToken = generateAccessToken(user);

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
            });
            req.user = jwt.decode(newAccessToken);
            return next();
        }

        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    if (!refreshToken) {
                        return res.status(403).json({ message: 'Access token expired and no refresh token found' });
                    }
                    try {
                        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                        const newAccessToken = generateAccessToken(user);
                        res.cookie('accessToken', newAccessToken, {
                            httpOnly: true,
                            secure: true,
                        });
                        req.user = user;
                        return next();
                    } catch (refreshErr) {
                        return res.status(403).json({ message: 'Invalid refresh token' });
                    }
                }

                return res.status(403).json({ message: 'Invalid access token' });
            }

            req.user = user;
            next();
        });

    } catch (err) {
        return res.status(403).json({ message: err.message || 'Token verification failed' });
    }
}

module.exports = { verifyAccessToken };
