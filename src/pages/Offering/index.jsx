import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapComponent from "../../components/mapComponent";
import "./OfferingPage.css";

const OfferingPage = () => {
  const { book_id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use Vite environment variable for the API base URL
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Early return if no book_id is provided
    if (!book_id) {
      setError("No book_id provided");
      navigate("/");
      return;
    }

    const fetchCollectionData = async () => {
      const authToken = localStorage.getItem("authToken");

      // Redirect to login if no auth token is found
      if (!authToken) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/collections/${book_id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Check for a failed response
        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          } else {
            throw new Error("Failed to fetch collection data");
          }
        }

        const data = await response.json();
        setBookData(data);
        setUserData(data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [book_id, apiUrl, navigate]);

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error state
  if (error) return <p>Error: {error}</p>;

  // Render main content if data is available
  return (
    <div className="offering-page">
      {bookData && userData ? (
        <>
          <div className="book-details">
            <img
              src={bookData.book.image}
              alt={bookData.book.title}
              className="book-cover"
            />
            <div className="book-info">
              <h2>{bookData.book.title}</h2>
              <p>{bookData.book.authors.join(", ")}</p>
              <p>Condition: {bookData.condition}</p>
              <p>
                Owner: {userData.first_name} {userData.last_name}
              </p>
              <p>{bookData.book.categories.join(", ")}</p>
            </div>
          </div>
          <div className="swap-details">
            <h3>Swap Details</h3>
            <p>
              Delivery Preference: {bookData.delivery_preference.join(", ")}
            </p>
            {userData.lat && userData.lng && (
              <MapComponent latitude={userData.lat} longitude={userData.lng} />
            )}
          </div>
          <p>Book ID: {book_id}</p>
          <button className="request-swap-button">Request Swap</button>
        </>
      ) : (
        <p>No book or user data available</p>
      )}
    </div>
  );
};

export default OfferingPage;
