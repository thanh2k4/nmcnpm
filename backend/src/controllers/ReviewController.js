const Review = require('../models/Review');
const ReviewUpdateRequest = require('../dto/request/ReviewUpdateRequest');
const User = require('../models/User');

// Create a new review
const createReview = async (req, res) => {
    try {
        if (!req.user.userId) {
            return res.status(403).json({ message: 'You are not allowed to create a review' });
        }
        const review = await Review.create({
            ...req.body,
            userId: req.user.userId
        });

        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all reviews by product id
const getReviewByProductId = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: {
                productId: req.params.id
            },
            include: {
                model: User,
                attributes: ['username']
            }
        }
        );
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
        console.log(JSON.stringify(req.body));
        const reviewData = new ReviewUpdateRequest(req.body);
        console.log(JSON.stringify(reviewData));
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