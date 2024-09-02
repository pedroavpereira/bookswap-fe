/* eslint-disable react/prop-types */
import { HiTrash } from "react-icons/hi2";
// import "./BookCard.css";
import { HiClock, HiOutlineSparkles } from "react-icons/hi";

function BookCard({
  user,
  book,
  collection,
  type = "search",
  onClick,
  onDelete,
}) {
  return (
    <div className="card-container" onClick={() => onClick(collection)}>
      <span href="/" className="hero-image-container">
        <img
          className="hero-image"
          src={book.image}
          alt="Spinning glass cube"
        />
      </span>
      <main className="main-content">
        <h1>
          <h2>{book.title}</h2>
        </h1>
        <div className="flex-row">
          {type === "search" && (
            <>
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

          {type === "selection" && (
            <div className="time-left">
              <HiOutlineSparkles className="small-image" />
              <p>{collection.condition}</p>
            </div>
          )}

          {type === "display" && (
            <>
              <div className="time-left">
                <HiOutlineSparkles className="small-image" />
                <p>{collection.condition}</p>
              </div>
              <div className="time-left">
                <HiTrash
                  className="small-image text-danger"
                  onClick={() => onDelete(collection)}
                />
              </div>
            </>
          )}

          {type === "display" && (
            <>
              <div className="time-left">
                <HiOutlineSparkles className="small-image" />
                <p>{collection.condition}</p>
              </div>
              <div className="time-left">
                <HiTrash
                  className="small-image text-danger"
                  onClick={() => onDelete(collection)}
                />
              </div>
            </>
          )}
        </div>
      </main>
      {type !== "selection" && (
        <div className="card-attribute">
          <p>
            <span>
              <p href="#">
                Owner: {user.first_name} {user.last_name}
              </p>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default BookCard;
