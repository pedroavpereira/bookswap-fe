import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookCollection } from '../../redux/actions/fetchBookCollectionAction'; // Adjust the path to your actual actions file

const Collection = () => {
  const dispatch = useDispatch();

  // Selectors to get data from Redux store (update paths and state as needed)
  const books = useSelector((state) => state.bookCollection.books);
  const loading = useSelector((state) => state.bookCollection.loading);
  const error = useSelector((state) => state.bookCollection.error);

  // Use useEffect to dispatch the fetchBookCollection thunk when the component mounts
  useEffect(() => {
    dispatch(fetchBookCollection());
  }, [dispatch]); // Dependency array includes dispatch to avoid warnings

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>  // Adjust based on your data structure
          ))}
        </ul>
      )}
    </div>
  );
};

export default Collection;
