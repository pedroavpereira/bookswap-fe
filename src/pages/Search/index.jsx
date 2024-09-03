import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchForm from "../../components/SearchForm";
import BookList from "../../components/BookList";
import FullPageSpinner from "../../components/FullPageSpinner";
import { API_URL } from "../../utils/constants";
import { Container, Row } from "react-bootstrap";
import BookCard from "../../components/BookCard";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const title = searchParams.get("title");
  const radius = searchParams.get("radius");

  useEffect(
    function () {
      async function fetchCollections() {
        try {
          setIsLoading(true);
          const response = await fetch(
            `${API_URL}/collections/search?radius=${radius}&lat=${lat}&lng=${lng}&title=${title}`
          );
          if (response.ok) {
            const data = await response.json();
            setCollections(data);
          } else {
            throw new Error("err");
          }
        } catch (err) {
          console.log(err);
          navigate("/");
        } finally {
          setIsLoading(false);
        }
      }

      fetchCollections();
    },
    [lat, lng, title, radius, navigate]
  );

  function handleCollectionClick(collection) {
    navigate(`/offering/${collection.collection_id}`);
  }

  if (isLoading) return <FullPageSpinner />;

  return (
    <Container>
      <Row className="my-4">
        <SearchForm />
      </Row>
      <Row className="my-4">
        <h2>
          Results for {title} in {radius} miles
        </h2>
      </Row>
      {collections.length > 0 && (
        <BookList>
          {collections.map((col) => (
            <BookCard
              onClick={handleCollectionClick}
              book={col.book}
              user={col.user}
              collection={col}
              key={col.collection_id}
            />
          ))}
        </BookList>
      )}
      {collections.length === 0 && (
        <div className="search-not-found">
          <p className="search-not-found-title">No books found</p>
          <p className="search-not-found-subtitle">
            Add book to your wishlist to be notified when it becomes available
          </p>

          <div className="search-not-found-action">
            <Link className="action-button action-button-highlight">
              Go to wishlist
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Search;
