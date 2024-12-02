const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

// Create a new review
router.post('/', verifyAccessToken, reviewController.createReview);

// Get all reviews by product id
router.get('/product/:id', verifyAccessToken, authorizeRoles("ADMIN"), reviewController.getReviewByProductId);

// Update a review by id
router.put('/:id', verifyAccessToken, authorizeRoles("USER"), reviewController.updateReview);

// Delete a review by id
router.delete('/:id', verifyAccessToken, authorizeRoles("USER", "ADMIN"), reviewController.deleteReview);

module.exports = router;