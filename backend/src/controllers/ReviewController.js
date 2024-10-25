const Review = require('../models/Review');
const ReviewUpdateRequest = require('../dto/request/ReviewUpdateRequest');

// Create a new review
const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all reviews by product id
const getReviewByProductId = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a review by id
const updateReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        const reviewData = new ReviewUpdateRequest(req.body);
        await review.update(reviewData);
        return res.status(200).json(review);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a review by id
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await review.destroy();
        return res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = { createReview, getReviewByProductId, updateReview, deleteReview };