const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

// Nguoi dung da dang nhap
router.post('/', verifyAccessToken, reviewController.createReview);

// xem review (khong yeu cau dang nhap)
router.get('/product/:id', reviewController.getReviewByProductId);

// Cap nhat danh gia
router.put('/:id', verifyAccessToken, reviewController.updateReview);

// Xoa danh gia(nguoi dung da dang nhap hoac admin)
router.delete('/:id', verifyAccessToken, authorizeRoles('ADMIN', 'USER'), reviewController.deleteReview);

module.exports = router;
