import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MapComponent from "../../components/MapComponent";
import FullPageSpinner from "../../components/FullPageSpinner";
import "./OfferingPage.css";
import { API_URL } from "../../utils/constants";
import { useSwaps } from "../../contexts/SwapsContext";
import { useCollections } from "../../contexts/CollectionsContext";
import { useUser } from "../../contexts/UserContext";
import Reviewlist from "../../components/Reviewlist";

const OfferingPage = () => {
  const navigate = useNavigate();
  const { collection_id } = useParams(); // Extract collection_id from URL params
  const { createSwap, swaps, isLoading: swapsLoading } = useSwaps();
  const { collections, isLoading: collectionsLoading } = useCollections();
  const { user, isLoading: userLoading } = useUser();
  const [bookData, setBookData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoading =
    swapsLoading || collectionsLoading || userLoading || loading;

  const alreadyRequested = swaps?.find(
    (s) => +collection_id === s.collection_requested
  );

  const userHasEnoughCollections = collections?.length >= 3;

  const yourCollection = user?.user_id === bookData?.user_id;

  useEffect(() => {
    if (!collection_id || (!userLoading && !user)) {
      setError("No collection_id provided");
      navigate("/");
      return;
    }

    const fetchCollectionData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/collections/id/${collection_id}`
        );
        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch collection data");
        }

        const data = await response.json();
        console.log(data);

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
  }, [collection_id, navigate, user, userLoading]);

  async function handleRequestSwap() {
    createSwap(collection_id);
  }

  if (isLoading) return <FullPageSpinner />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="offering-page">
      <div className="product-card my-5">
        {bookData && userData ? (
          <div className="product-container">
            <div className="product-image">
              <img
                className=" book-shadow"
                src={bookData.book.image}
                alt={bookData.book.title}
              />
              <div className="offering-action-button">
                {yourCollection && (
                  <button className="action-button action-button-highlight book-shadow">
                    Your Collection
                  </button>
                )}
                {!yourCollection && alreadyRequested && (
                  <button className="action-button action-button-highlight book-shadow">
                    Already requested
                  </button>
                )}
                {!yourCollection &&
                  !alreadyRequested &&
                  !userHasEnoughCollections && (
                    <Link
                      to="/collection"
                      className="action-button action-button-highlight book-shadow"
                    >
                      Not enough books in your collection
                    </Link>
                  )}
                {!yourCollection &&
                  userHasEnoughCollections &&
                  !alreadyRequested && (
                    <button
                      onClick={handleRequestSwap}
                      className="action-button action-button-highlight"
                    >
                      Request Swap
                    </button>
                  )}
              </div>
            </div>
            <div className="product-info-container">
              <h2 className="book-title">{bookData.book.title}</h2>
              <div className="book-attribute-container">
                <p className="book-attribute">
                  <span className="book-attribute-hightlight">
                    Author{bookData.book.authors.length > 1 ? "'s " : " "}:
                  </span>
                  {bookData.book.authors.join(", ")}
                </p>
                <p className="book-attribute">
                  {" "}
                  <span className="book-attribute-hightlight">Condition: </span>
                  {bookData.condition}
                </p>
                <p className="book-attribute">
                  <span className="book-attribute-hightlight">Owner: </span>
                  {userData.first_name} {userData.last_name}
                </p>
                <p className="book-attribute">
                  <span className="book-attribute-hightlight">
                    Categories:{" "}
                  </span>{" "}
                  {bookData.book.categories.join(", ")}
                </p>
                <p className="book-swap-preferences">
                  <span className="book-attribute-hightlight">
                    Delivery Preference:
                  </span>{" "}
                  {bookData.delivery_preference.join(", ")}
                </p>
              </div>

              <div className="swap-details">
                {/* <h3>Swap Details</h3>
                <p>
                  Delivery Preference: {bookData.delivery_preference.join(", ")}
                </p> */}
                {userData.lat && userData.lng && (
                  <MapComponent
                    latitude={userData.lat}
                    longitude={userData.lng}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No book or user data available</p>
        )}
      </div>
      <Reviewlist />
    </div>
  );
};

export default OfferingPage;
