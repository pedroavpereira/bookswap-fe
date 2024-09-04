/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form } from "react-bootstrap";

import { useUser } from "../../contexts/UserContext";
import { API_URL } from "../../utils/constants";

import StarRating from "../StarRating";

function UserReviewForm({ onSubmit, swap }) {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  const userReviewId =
    swap.user_offered === user.user_id
      ? swap.user_requesting
      : swap.user_offered;

  async function createReview() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const reqBody = {
      rating,
      message,
      submitted_by: user.user_id,
      user_id: userReviewId,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(reqBody),
    };

    try {
      setIsReviewing(true);

      const response = await fetch(`${API_URL}/reviews/`, options);

      if (response.status !== 201) return null;
    } catch (err) {
      console.log(err);
    } finally {
      setIsReviewing(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsReviewing();
    if (rating) {
      await createReview();
    }
    onSubmit(swap.swap_id);
  }
  return (
    <Form className="review-form" onSubmit={handleSubmit}>
      {isReviewing && (
        <div className="spinner-chat-window-background">
          <div className="spinner"></div>
        </div>
      )}
      <div className="review-group">
        <Form.Label>Rating</Form.Label>
        <StarRating
          onSetRating={setRating}
          className="review-flex-item-center"
          rating={rating}
          setRating={setRating}
          color="#f5af38"
        />
      </div>
      <div className="review-group">
        <Form.Label>Aditional Message</Form.Label>
        <textarea
          className="review-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="action-button action-button-highlight "
        onClick={handleSubmit}
      >
        Mark as completed
      </button>
    </Form>
  );
}

export default UserReviewForm;
