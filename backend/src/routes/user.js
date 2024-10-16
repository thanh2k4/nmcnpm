const userController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;