import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "../../components/MapComponent";
import "./OfferingPage.css";
import { API_URL } from "../../utils/constants";

// Mock data based on the provided structure for fallback
const mockData = {
  collection_id: 4,
  book_id: 3,
  user_id: 1,
  condition: "mint",
  delivery_preference: ["hand-off"],
  book: {
    book_id: 3,
    title: "Crime and Punishment",
    authors: ["Fyodor Dostoyevsky"],
    categories: ["Fiction"],
    lang: "en",
    isbn: "9780140449136",
    image:
      "http://books.google.com/books/content?id=SYu-4-oO3h8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  user: {
    first_name: "test",
    last_name: "etst",
    lat: 52.404387,
    lng: -1.515175,
  },
};

const OfferingPage = () => {
  const { collection_id } = useParams(); // Extract collection_id from URL params
  const [bookData, setBookData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded API URL for fetching data
  const apiUrl = API_URL;

  useEffect(() => {
    // Early return if no collection_id is provided
    if (!collection_id) {
      setError("No collection_id provided");
      return;
    }

    const fetchCollectionData = async () => {
      try {
        // Fetch real data from the API
        const response = await fetch(
          `${apiUrl}/collections/id/${collection_id}`
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
        // Fallback to mock data if fetch fails
        if (parseInt(collection_id) === mockData.collection_id) {
          setBookData(mockData);
          setUserData(mockData.user);
        } else {
          setError("Collection not found");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [collection_id, apiUrl]);

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
          <p>Collection ID: {collection_id}</p>
          <button className="request-swap-button">Request Swap</button>
        </>
      ) : (
        <p>No book or user data available</p>
      )}
    </div>
  );
};

export default OfferingPage;
