import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createReview, updateReview } from "../../API/reviewAPI";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ReviewForm.css";

const ReviewForm = ({ productId, onReviewAdded, existingReview = null }) => {
  const user = useSelector((state) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.review);
      setIsEditing(true);
    }
  }, [existingReview]);

  const resetForm = () => {
    setRating(0);
    setComment("");
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to submit a review", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const reviewData = {
        userId: parseInt(user.userId),
        productId: parseInt(productId),
        rating: parseInt(rating),
        review: comment.trim(),
      };

      let response;
      if (isEditing && existingReview) {
        response = await updateReview(existingReview.reviewId, reviewData);
        toast.success("Review updated successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        response = await createReview(reviewData);
        toast.success("Review submitted successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }

      const reviewWithUser = {
        ...response,
        User: {
          userId: user.userId,
          username: user.username,
        },
      };

      onReviewAdded(reviewWithUser);
      resetForm();
    } catch (err) {
      toast.error(
        err.message || `Failed to ${isEditing ? "update" : "submit"} review`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4>{isEditing ? "Edit Review" : "Write a Review"}</h4>

      <div className="rating-container">
        <label>Your Rating:</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => setRating(value)}
              className={`star-button ${value <= rating ? "active" : ""}`}
              disabled={isSubmitting}
            >
              <FaStar />
            </button>
          ))}
        </div>
      </div>

      <div className="comment-container">
        <label>Your Review:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
          disabled={isSubmitting}
          maxLength={500}
          required
        />
        <small>{comment.length}/500</small>
      </div>

      <div className="button-container">
        <button
          type="button"
          onClick={resetForm}
          className="reset-button"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting || !rating || !comment.trim()}
        >
          {isSubmitting
            ? "Submitting..."
            : isEditing
            ? "Update Review"
            : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
