const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(403).json({ message: 'Access token not found' });
    }

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid access token' });
        }
        req.user = user;
        next();
    });
}

module.exports = verifyAccessToken;