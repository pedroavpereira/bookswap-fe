/* eslint-disable react/prop-types */
import React from "react";
import BookCard from "../BookCard";

function BookList({ collections }) {
  return (
    <div className="bookList-container" role="list">
      {collections.map((col) => (
        <BookCard collection={col} key={col.collection_id} />
      ))}
    </div>
  );
}

export default BookList;
