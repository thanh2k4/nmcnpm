const express = require('express');
const {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    getUserProfile
} = require('../controllers/UserController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

const router = express.Router();

//Tao moi user
router.post('/', createUser);

// Lấy tất cả người dùng (admin)
router.get('/', verifyAccessToken, authorizeRoles('ADMIN'), getUsers);

// Lấy hồ sơ người dùng (chỉ người dùng đã đăng nhập)
router.get('/me', verifyAccessToken, getUserProfile);

// Lấy thông tin người dùng theo id (chỉ admin hoặc chính người dùng mới có quyền)
router.get('/:userId', verifyAccessToken, authorizeRoles('ADMIN', 'USER'), getUserById);

// Xóa người dùng theo id (chỉ admin hoặc chính người dùng mới có quyền)
router.delete('/:id', verifyAccessToken, authorizeRoles('ADMIN', 'USER'), deleteUser);

// Cập nhật thông tin người dùng (chỉ người dùng đã đăng nhập)
router.put('/me', verifyAccessToken, updateUser);

module.exports = router;
