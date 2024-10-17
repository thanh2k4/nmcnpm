const userController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

router.post('/', userController.createUser);
router.get('/', verifyAccessToken, authorizeRoles("ADMIN"), userController.getUsers);
router.get('/:userId', verifyAccessToken, authorizeRoles("ADMIN"), userController.getUserById);
router.patch('/', verifyAccessToken, authorizeRoles, userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.get('/profile', verifyAccessToken, authorizeRoles, userController.getUserProfile);

module.exports = router;