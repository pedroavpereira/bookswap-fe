import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MapComponent from "../../components/MapComponent";
import FullPageSpinner from "../../components/FullPageSpinner";
import "./OfferingPage.css";
import { API_URL } from "../../utils/constants";
import { useSwaps } from "../../contexts/SwapsContext";
import { useCollections } from "../../contexts/CollectionsContext";

const OfferingPage = () => {
  const navigate = useNavigate();
  const { collection_id } = useParams(); // Extract collection_id from URL params
  const { createSwap, swaps } = useSwaps();
  const { collections } = useCollections();
  const [bookData, setBookData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const alreadyRequested = swaps?.find(
    (s) => collection_id === s.collection_requested
  );
  const userHasEnoughCollections = collections?.length > 3;

  useEffect(() => {
    // Early return if no collection_id is provided
    if (!collection_id) {
      setError("No collection_id provided");
      navigate("/");
      return;
    }

    const fetchCollectionData = async () => {
      try {
        // Fetch real data from the API
        const response = await fetch(
          `${API_URL}/collections/id/${collection_id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch collection data");
        }

        const data = await response.json();

        // Ensure data matches the requested collection_id
        if (data && data.collection_id === parseInt(collection_id)) {
          setBookData(data);
          setUserData(data.user);
        } else {
          setError("Collection not found");
        }
      } catch (error) {
        console.error("Error fetching data from API, using mock data:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [collection_id, navigate]);

  // Render loading state
  if (loading) return <FullPageSpinner />;

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
          {alreadyRequested && (
            <p className="request-swap-button">Already requested</p>
          )}
          {!alreadyRequested && !userHasEnoughCollections && (
            <p className="request-swap-button">
              Not enough books in your collection
            </p>
          )}
          {userHasEnoughCollections && !alreadyRequested && (
            <button className="request-swap-button">Request Swap</button>
          )}
        </>
      ) : (
        <p>No book or user data available</p>
      )}
    </div>
  );
};

export default OfferingPage;
