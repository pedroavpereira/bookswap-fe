/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import BookSearch from "../BookSearch";

const distancesAllowed = [0.5, 1, 5, 10, 15, 20];

function WishlistAddForm({ onSubmit }) {
  const [isbn, setIsbn] = useState("");
  const [bookSelected, setBookSelected] = useState(null);
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

    setBookSelected(selected);
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
        setIsbnError(false);
      } else {
        setIsbnError(true);
        setIsbnChecked(false);
      }
    } catch (err) {
      console.log(err);
      setIsbnError(true);
      setIsbnChecked(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isbnChecked && radius) {
      onSubmit({ isbn, radius });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Form.Label htmlFor="book-title">
            Book Title:
            <span className="text-danger">
              {isbnError && "Please enter a correct ISBN"}
            </span>
          </Form.Label>
          <BookSearch
            setChecked={setIsbnChecked}
            selected={bookSelected}
            setSelected={handleBookSelected}
          />
        </Row>
        <Row className="my-2">
          <Col>
            <Form.Label htmlFor="isbn">
              ISBN:
              <span className="text-danger">
                {isbnError && "Please enter a correct ISBN"}
              </span>
            </Form.Label>
            <Row>
              <Col xs={10}>
                <Form.Control
                  id="isbn"
                  value={isbn}
                  onChange={(e) => {
                    setIsbnChecked(false);
                    setIsbnError(false);
                    setIsbn(e.target.value);
                  }}
                />
              </Col>
              <Col xs={2} className="px-0">
                <Button onClick={checkIsbn}>Verify</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Form.Label htmlFor="radius">Radius:</Form.Label>
            <Form.Select
              id="radius"
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
              You must verify the ISBN before adding the book to the wishlist
            </p>
          )}
          <Button
            type="submit"
            disabled={!isbnChecked}
            className="align-self-end"
          >
            Add to wishlist
          </Button>
        </Row>
      </Container>
    </Form>
  );
}

export default WishlistAddForm;
