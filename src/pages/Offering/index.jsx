import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapComponent from "../../components/MapComponent";
import "./OfferingPage.css";

// Mock data based on the provided structure
const mockData = {
  collection_id: 5,
  book_id: 4,
  user_id: 1,
  condition: "mint",
  delivery_preference: ["hand-off"],
  book: {
    book_id: 4,
    title: "War and Peace",
    authors: ["graf Leo Tolstoy", "Louise Maude"],
    categories: ["Fiction"],
    lang: "en",
    isbn: "9780192833983",
    image:
      "http://books.google.com/books/content?id=9nxfsPujsYoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
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
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use Vite environment variable for the API base URL
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Early return if no collection_id is provided
    if (!collection_id) {
      setError("No collection_id provided");
      navigate("/");
      return;
    }

    // Check if we're using mock data or real API data
    const useMockData = true; // Set this to false to use real API data

    const fetchCollectionData = async () => {
      if (useMockData) {
        // Use mock data
        setTimeout(() => {
          if (parseInt(collection_id) === mockData.collection_id) {
            setBookData(mockData);
            setUserData(mockData.user);
            setLoading(false);
          } else {
            setError("Collection not found");
            setLoading(false);
          }
        }, 1000); // Simulate network delay
      } else {
        // Fetch data from the API
        const authToken = localStorage.getItem("authToken");

        // Redirect to login if no auth token is found
        if (!authToken) {
          navigate("/login");
          return;
        }

        try {
          const response = await fetch(
            `${apiUrl}/collections/id/${collection_id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

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
      }
    };

    fetchCollectionData();
  }, [collection_id, apiUrl, navigate]);

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
