/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./BookCard.css";
import { HiClock, HiOutlineSparkles } from "react-icons/hi";

function BookCard({ user, book, collection, wish, type = "search" }) {
  const navigate = useNavigate();

  function handleClick() {
    if (type !== "search") return;
    navigate(`/offering/${collection.collection_id}`);
  }

  return (
    <div className="card-container" onClick={handleClick}>
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
        <div className="flex-row">
          {type === "search" && (
            <>
              {" "}
              <div className="time-left">
                <HiOutlineSparkles className="small-image" />
                <p>{collection.condition}</p>
              </div>
              <div className="time-left">
                <HiClock className="small-image" />
                <p>{Math.round(collection.distance * 100) / 100} miles away</p>
              </div>
            </>
          )}
        </div>
      </main>
      <div className="card-attribute">
        <p>
          <span>
            <p href="#">
              Owner: {user.first_name} {user.last_name}
            </p>
          </span>
        </p>
      </div>
    </div>
  );
}

export default BookCard;
