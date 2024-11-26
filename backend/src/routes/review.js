const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/', reviewController.createReview);

// Get all reviews by product id
router.get('/product/:id', reviewController.getReviewByProductId);

// Update a review by id
router.put('/:id', reviewController.updateReview);

// Delete a review by id
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
