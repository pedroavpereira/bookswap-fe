/* eslint-disable react/prop-types */
import { useState } from "react";
import { API_URL } from "../../utils/constants";

function RecommendationCard({ book }) {
  const [added, setAdded] = useState(false);

  async function createWishList(data) {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`${API_URL}/wishlists`, options);

      if (response.status !== 201) return null;

      setAdded(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="card-recommendation-homepage">
      <span href="/" className="hero-image-container">
        <img
          className="hero-image"
          src={book?.image}
          alt="Spinning glass cube"
        />
      </span>
      <main className="main-content">
        <h2>
          <p>{book?.title}</p>
        </h2>
        <div className="flex-row"></div>
      </main>
      <div className="card-attribute">
        <button
          className="action-button action-button-highlight"
          onClick={createWishList}
        >
          Add to wishlist
        </button>
      </div>
    </div>
  );
}

export default RecommendationCard;
