/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function BookSearch({
  query,
  setQuery,
  className = "",
  selected = null,
  setSelected,
  children,
}) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  // console.log(results);

  function handleSelection(selected) {
    setQuery(selected.volumeInfo.title);
    setSelected(selected);
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&orderBy=relevance&langRestrict=en`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          setResults(data?.items?.slice(6));
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query?.length < 3) {
        setResults([]);
        return;
      }

      if (selected) {
        setResults([]);
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, selected]
  );

  return (
    <div className={className}>
      {children}
      {/* <Form.Control
        value={query}
        onChange={(e) => {
          onTyping();
          setSelected(null);
          setQuery(e.target.value);
        }} 
      />*/}
      <div className="relative">
        {/* {results?.items?.length > 0 && results.items[0]?.volumeInfo?.title} */}
        {results?.length > 0 && !isLoading && (
          <div className={`search-book-results`}>
            {results.map((result) => (
              <Result
                key={result.id}
                data={result}
                onSelection={handleSelection}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Result({ data, onSelection }) {
  const authors = data?.volumeInfo?.authors;
  const title = data?.volumeInfo?.title;
  const image = data?.volumeInfo?.imageLinks?.smallThumbnail;
  console.log(image);

  return (
    <div className="search-book-result" onClick={() => onSelection(data)}>
      <img
        style={{ width: "3rem" }}
        src={image ? image : "./book_cover_unavailable.jpg"}
      />
      <div className="search-book-result-information">
        <p className="search-book-title">{title}</p>
        <p className="search-book-authors">{authors?.join(", ")}</p>
      </div>
    </div>
  );
}

export default BookSearch;
