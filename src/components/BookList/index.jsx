/* eslint-disable react/prop-types */
import BookCard from "../BookCard";

function BookList({ collections }) {
  return (
    <div className="bookList-container">
      {collections.map((col) => (
        <BookCard collection={col} key={col.collection_id} />
      ))}
    </div>
  );
}

export default BookList;
