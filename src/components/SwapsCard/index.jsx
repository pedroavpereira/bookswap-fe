/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./WishListCard.css";
import { HiClock, HiOutlineSparkles, HiTrash } from "react-icons/hi";

function SwapsCard({ swap, onDelete }) {
  const navigate = useNavigate();

  //
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
        <h1>
          <h2 href="#">{book.title}</h2>
        </h1>
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

export default SwapsCard;
