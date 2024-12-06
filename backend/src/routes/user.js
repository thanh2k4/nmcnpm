const express = require('express');
const { createUser, getUsers, getUserById, deleteUser, updateUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // nếu có sử dụng middleware xác thực

const router = express.Router();

// Tạo mới người dùng
router.post('/users', createUser);

// Lấy tất cả người dùng (có thể cần quyền admin)
router.get('/users', getUsers);

// Lấy hồ sơ người dùng (chỉ người dùng đã đăng nhập)
router.get('/users/me', authMiddleware, getUserProfile);

// Lấy người dùng theo id
router.get('/users/:userId', getUserById);

// Xóa người dùng theo id (chỉ admin hoặc chính người dùng mới có thể)
router.delete('/users/:id', deleteUser);

// Cập nhật người dùng (chỉ người dùng đã đăng nhập)
router.put('/users/me', authMiddleware, updateUser);



module.exports = router;
