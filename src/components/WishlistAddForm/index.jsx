/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import BookSearch from "../BookSearch";

const distancesAllowed = [0.5, 1, 5, 10, 15, 20];

function WishlistAddForm({ onSubmit }) {
  const [isbn, setIsbn] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [searchSelected, setSearchSelected] = useState(null);
  const [radius, setRadius] = useState(10);
  const [isbnChecked, setIsbnChecked] = useState(false);
  const [isbnError, setIsbnError] = useState(false);

  function handleBookSelected(selected) {
    console.log(selected?.volumeInfo?.industryIdentifiers);

    const isbns = selected?.volumeInfo?.industryIdentifiers;
    const isbn13 = isbns?.find((el) => el.type === "ISBN_13");

    if (isbn13?.identifier) {
      setIsbn(isbn13?.identifier);
    }

    setSearchSelected(selected);
  }

  async function checkIsbn() {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );

      if (!response.ok) return null;

      const data = await response.json();

      if (data.totalItems === 1) {
        setIsbnChecked(true);
      } else {
        setIsbnError(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Log form data or handle it as needed
    if (isbnChecked && radius) {
      onSubmit({ isbn, radius });
    }
  };

  function handleReset() {
    setIsbn("");
    setIsbnChecked(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Form.Label>
            Book Title:{" "}
            <span className="text-danger">
              {isbnError && "Please enter a correct ISBN"}
            </span>
          </Form.Label>
          <BookSearch
            query={titleInput}
            setQuery={setTitleInput}
            setSelected={handleBookSelected}
            selected={searchSelected}
          >
            {" "}
            <Form.Control
              className="w-full searchform-input searchform-title-input"
              type="text"
              value={titleInput}
              placeholder="Book title"
              onChange={(e) => {
                handleReset();
                setTitleInput(e.target.value);
              }}
            />
          </BookSearch>
        </Row>
        <Row className="my-2">
          <Col>
            <Form.Label>
              ISBN:{" "}
              <span className="text-danger">
                {isbnError && "Please enter a correct ISBN"}
              </span>
            </Form.Label>
            <Row>
              <Col xs={10}>
                <Form.Control
                  value={isbn}
                  onChange={(e) => {
                    setIsbnChecked(false);
                    setIsbnError(false);
                    setIsbn(e.target.value);
                  }}
                />
              </Col>
              <Col xs={2} className="px-0">
                <button
                  className="action-button action-button-highlight"
                  onClick={checkIsbn}
                >
                  Verify
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Form.Label>Radius:</Form.Label>
            <Form.Select
              className=""
              aria-label="Radius distance in miles"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            >
              {distancesAllowed.map((dist) => (
                <option key={dist} value={dist}>
                  {dist} miles
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mt-3">
          {!isbnChecked && (
            <p className="text-center text-danger">
              You must verify the ISBN before adding book to wishlist
            </p>
          )}
          <button
            type="submit"
            disabled={!isbnChecked}
            className="action-button action-button-highlight align-self-end"
          >
            Add to wishlist
          </button>
        </Row>
      </Container>
    </Form>
  );
}

export default WishlistAddForm;
