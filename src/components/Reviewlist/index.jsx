import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";

const ReviewList = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/reviews/user/${userId}`, {
          headers: { Authorization: token },
        });

        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="review-list">
      <h2 className="section-title">Reviews</h2>
      {reviews.length > 0 ? (
        <ul className="list-unstyled">
          {reviews.map((review) => (
            <li key={review.review_id} className="mb-3 p-3 border rounded">
              <p className="mb-1">
                <strong>Rating:</strong> {review.rating}/5
              </p>
              <p className="mb-0">{review.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
