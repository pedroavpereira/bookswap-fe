import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchForm from "../../components/SearchForm";
import BookList from "../../components/BookList";
import FullPageSpinner from "../../components/FullPageSpinner";
import { API_URL } from "../../utils/constants";

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
    <div>
      <SearchForm />
      <h2>
        Results for {title} in {radius} miles
      </h2>
      <BookList collections={collections} />
    </div>
  );
}

export default Search;
