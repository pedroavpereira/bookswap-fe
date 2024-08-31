import React from "react";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function BookSearch({ selected, setSelected, onTyping }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSelection(selected) {
    setQuery(selected.volumeInfo.title);
    setSelected(selected);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      try {
        setIsLoading(true);

        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&orderBy=relevance&langRestrict=en`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching books");

        const data = await res.json();

        setResults(data.items || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3 || selected) {
      setResults([]);
      return;
    }

    fetchBooks();

    return function () {
      controller.abort();
    };
  }, [query, selected]);

  return (
    <div>
      <Form.Control
        value={query}
        onChange={(e) => {
          onTyping();
          setSelected(null);
          setQuery(e.target.value);
        }}
        data-testid="book-search-input"
      />
      <div className="relative">
        {results.length > 0 && !isLoading && (
          <div
            className="search-book-results"
            data-testid="search-results-container"
          >
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
  const { authors, title, imageLinks } = data.volumeInfo;
  const image = imageLinks?.smallThumbnail;

  return (
    <div
      className="search-book-result"
      onClick={() => onSelection(data)}
      data-testid="search-book-result"
    >
      {image && <img style={{ width: "3rem" }} src={image} alt={title} />}
      <div className="search-book-result-information">
        <p>{title}</p>
        {authors && (
          <p>
            {authors.slice(0, 3).map((author, index, array) => (
              <span key={author}>
                {author}
                {index < array.length - 1 && index < 2 && ", "}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

export default BookSearch;
