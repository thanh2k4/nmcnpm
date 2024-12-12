const express = require('express');
const {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    getUserProfile
} = require('../controllers/userController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

const router = express.Router();

//Tao moi user
router.post('/users', createUser);

// Lấy tất cả người dùng (admin)
router.get('/users', verifyAccessToken, authorizeRoles(['ADMIN']), getUsers);

// Lấy hồ sơ người dùng (chỉ người dùng đã đăng nhập)
router.get('/users/me', verifyAccessToken, getUserProfile);

// Lấy thông tin người dùng theo id (chỉ admin hoặc chính người dùng mới có quyền)
router.get('/users/:userId', verifyAccessToken, authorizeRoles(['ADMIN', 'USER']), getUserById);

// Xóa người dùng theo id (chỉ admin hoặc chính người dùng mới có quyền)
router.delete('/users/:id', verifyAccessToken, authorizeRoles(['ADMIN']), deleteUser);

// Cập nhật thông tin người dùng (chỉ người dùng đã đăng nhập)
router.put('/users/me', verifyAccessToken, updateUser);

module.exports = router;
