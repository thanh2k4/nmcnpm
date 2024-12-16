class ReviewUpdateRequest {
    constructor({ rating, review }) {
        this.rating = Number(rating);
        this.review = review;
    }
}

module.exports = ReviewUpdateRequest;