const userController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

router.get('/profile', verifyAccessToken, authorizeRoles("ADMIN", "USER"), userController.getUserProfile);
router.post('/', userController.createUser);
router.get('/', verifyAccessToken, authorizeRoles("ADMIN"), userController.getUsers);
router.get('/:userId', verifyAccessToken, authorizeRoles("ADMIN"), userController.getUserById);
router.patch('/', verifyAccessToken, authorizeRoles("ADMIN", "USER"), userController.updateUser);
router.delete('/:userId', verifyAccessToken, authorizeRoles("ADMIN"), userController.deleteUser);

module.exports = router;