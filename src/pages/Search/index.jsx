import { useNavigate, useSearchParams } from "react-router-dom";
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
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            setCollections(data);
          } else {
            throw new Error("err");
          }
        } catch (err) {
          navigate("/");
        } finally {
          setIsLoading(false);
        }
      }

      fetchCollections();
    },
    [lat, lng, title, radius, navigate]
  );

  if (isLoading) return <FullPageSpinner />;

  return (
    <Container>
      <Row>
        <SearchForm />
      </Row>
      <Row>
        <h2>
          Results for {title} in {radius} miles
        </h2>
      </Row>
      <BookList>
        {collections.map((col) => (
          <BookCard collection={col} key={col.collection_id} />
        ))}
      </BookList>
    </Container>
  );
}

export default Search;
