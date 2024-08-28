/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function BookCard({ collection }) {
  const navigate = useNavigate();

  const { book } = collection;

  function handleClick() {
    navigate(`/offering/${collection.collection_id}`);
  }
  return (
    <div onClick={handleClick} className="bookcard-container">
      <img src={book.image} className="bookcard-image" />
      <p className="bookcard-title">{book.title}</p>
      <p className="bookcard-condition">
        <span className="bookcard-attribute">Condition: </span>{" "}
        <span>{collection.condition}</span>
      </p>
      <p className="bookcard-owner">
        <span className="bookcard-attribute">Owner: </span>{" "}
        <span>
          {collection.user.first_name} {collection.user.last_name}
        </span>
      </p>
    </div>
  );
}

export default BookCard;
