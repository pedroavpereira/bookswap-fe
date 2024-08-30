/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function BookSearch({ selected, setSelected, onTyping }) {
  const [query, setQuery] = useState("");
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

          setResults(data.items.slice(6));
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
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
    <div>
      <Form.Control
        value={query}
        onChange={(e) => {
          onTyping();
          setSelected(null);
          setQuery(e.target.value);
        }}
      />
      <div className="relative">
        {/* {results?.items?.length > 0 && results.items[0]?.volumeInfo?.title} */}
        {results?.length > 0 && !isLoading && (
          <div className="search-book-results">
            {results.map((res) => (
              <Result key={res.id} data={res} onSelection={handleSelection} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Result({ data, onSelection }) {
  let authors = data?.volumeInfo?.authors;
  const title = data?.volumeInfo?.title;
  const image = data?.volumeInfo?.imageLinks?.smallThumbnail;

  return (
    <div className="search-book-result" onClick={() => onSelection(data)}>
      <img style={{ width: "3rem" }} src={image} />
      <div className="search-book-result-information">
        <p>{title}</p>
        <p>
          {authors
            ? typeof authors === "string"
              ? authors
              : authors.slice(0, 3).map((au, i) => (
                  <span key={au}>
                    {au} {i <= 1 ? "," : ""}{" "}
                  </span>
                ))
            : null}
        </p>
      </div>
    </div>
  );
}

export default BookSearch;
