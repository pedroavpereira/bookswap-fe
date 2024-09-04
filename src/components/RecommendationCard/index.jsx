/* eslint-disable react/prop-types */
import { useState } from "react";
import { API_URL } from "../../utils/constants";

function RecommendationCard({ image, isbn }) {
  const [added, setAdded] = useState(false);

  async function createWishList() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const data = { isbn: isbn, radius: 10 };

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
    } finally {
    }
  }

  return (
    <div className="card-recommendation-homepage">
      <span href="/" className="hero-image-container">
        <img className="hero-image" src={image} alt="Spinning glass cube" />
      </span>
      <main className="main-content main-content-recommendation">
        <div className="flex-row"></div>
      </main>
      <div>
        {!added && (
          <button
            className="action-button action-button-highlight"
            onClick={createWishList}
          >
            Add to wishlist
          </button>
        )}
        {added && (
          <button
            className="action-button action-button-primary"
            disabled={true}
          >
            Added
          </button>
        )}
      </div>
    </div>
  );
}

export default RecommendationCard;
