/* eslint-disable react/prop-types */
import "./WishListCard.css";
import { HiClock, HiTrash } from "react-icons/hi";

function WishListCard({ wish, onDelete }) {
  const { book } = wish;

  return (
    <div className="card-container">
      <a href="/" className="hero-image-container">
        <img
          className="hero-image"
          src={book.image}
          alt="Spinning glass cube"
        />
      </a>
      <main className="main-content">
        <h2>
          <p>{book.title}</p>
        </h2>
        <div className="card-attribute" style={{ marginTop: "0.2rem" }}>
          <div className="flex-row">
            <div className="time-left">
              <HiClock className="small-image" />
              <p>{wish.radius} miles</p>
            </div>
            <div className="time-left">
              <HiTrash
                className="small-image text-danger"
                onClick={() => onDelete(wish.wishlist_id)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WishListCard;
