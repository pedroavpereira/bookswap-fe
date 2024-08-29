import { useState, useEffect } from "react";
import MapComponent from "./mapComponent"; // Import the Map component you have
import "./OfferingPage.css"; // Import a CSS file for styling this component

const OfferingPage = () => {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchBookData = async () => {
      try {
        const response = await fetch("/api/books/{bookId}"); // Use the actual API endpoint
        const data = await response.json();
        setBookData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="offering-page">
      {bookData && (
        <>
          <div className="book-details">
            <img
              src={bookData.coverImageUrl}
              alt={bookData.title}
              className="book-cover"
            />
            <div className="book-info">
              <h2>{bookData.title}</h2>
              <p>{bookData.author}</p>
              <p>{bookData.rating}/5</p>
              <p>Condition: {bookData.condition}</p>
              <p>Owner: {bookData.owner}</p>
              <p>{bookData.description}</p>
            </div>
          </div>
          <div className="swap-details">
            <h3>Swap Details</h3>
            <p>{bookData.swapLocation}</p>
            <MapComponent location={bookData.location} />
          </div>
          <button className="request-swap-button">Request Swap</button>
        </>
      )}
    </div>
  );
};

export default OfferingPage;
