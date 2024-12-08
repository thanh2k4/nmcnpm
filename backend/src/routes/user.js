const express = require('express');
const { createUser, getUsers, getUserById, deleteUser, updateUser, getUserProfile } = require('../controllers/userController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

const router = express.Router();

// Tạo mới người dùng
router.post('/', createUser);

// Lấy tất cả người dùng (có thể cần quyền admin)
router.get('/', verifyAccessToken, authorizeRoles("ADMIN"), getUsers);


// Lấy hồ sơ người dùng (chỉ người dùng đã đăng nhập)
router.get('/me', verifyAccessToken, authorizeRoles("USER", "ADMIN"), getUserProfile);

// Lấy người dùng theo id
router.get('/:userId', verifyAccessToken, authorizeRoles("ADMIN"), getUserById);

// Xóa người dùng theo id (chỉ admin hoặc chính người dùng mới có thể)
router.delete('/:id', verifyAccessToken, authorizeRoles("USER", "ADMIN"), deleteUser);

// Cập nhật người dùng (chỉ người dùng đã đăng nhập)
router.put('/me', verifyAccessToken, authorizeRoles("USER"), updateUser);



module.exports = router;