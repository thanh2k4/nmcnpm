const redisClient = require('../config/redis');

const saveRefreshToken = async (userId, refreshToken) => {
    await redisClient.set(`refreshToken:${userId}`, refreshToken, {
        EX: 30 * 24 * 60 * 60,
    });
};

const getRefreshToken = async (userId) => {
    return await redisClient.get(`refreshToken:${userId}`);
};

const deleteRefreshToken = async (userId) => {
    await redisClient.del(`refreshToken:${userId}`);
};

module.exports = { saveRefreshToken, getRefreshToken, deleteRefreshToken };
