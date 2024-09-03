import React from "react";
import { HiTrash } from "react-icons/hi2";
import { HiClock, HiOutlineSparkles } from "react-icons/hi";

function BookCard({ user, book, collection, type = "search", onClick, onDelete }) {
  return (
    <div className="card-container" onClick={() => onClick(collection)}>
      <span href="/" className="hero-image-container">
        <img className="hero-image" src={book.image} alt="Spinning glass cube" />
      </span>
      <main className="main-content">
        <h1>
          <span>{book.title}</span>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(collection);
                  }}
                  role="button"
                  aria-label="delete"
                  data-testid="delete-button"
                />
              </div>
            </>
          )}
        </div>
      </main>
      {type === "selection" && (
        <div className="card-attribute">
          <p>
            <span>
              Owner: {user.first_name} {user.last_name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default BookCard;