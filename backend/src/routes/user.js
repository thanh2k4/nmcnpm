const userController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

router.post('/', userController.addUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;