const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
        return res.status(401).json({ message: 'Access token not found' });
    }
    try {
        const user = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
}