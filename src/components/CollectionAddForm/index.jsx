/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import BookSearch from "../BookSearch";

const deliveryOptions = [
  "Door Pickup",
  "Door Dropoff",
  "Postal Service",
  "Public meetup",
];

function CollectionAddForm({ onSubmit }) {
  const [isbn, setIsbn] = useState("");
  const [bookSelected, setBookSelected] = useState(null);
  const [condition, setCondition] = useState("mint");
  const [delivery_preference, setDelivery_preference] = useState([]);
  const [isbnChecked, setIsbnChecked] = useState(false);
  const [isbnError, setIsbnError] = useState(false);

  function handleReset() {
    setIsbn("");
    setIsbnChecked(false);
  }

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
    if (isbnChecked && delivery_preference.length >= 1 && condition) {
      onSubmit({ isbn, delivery_preference, condition });
    }
  };
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
            onTyping={handleReset}
            selected={bookSelected}
            setSelected={handleBookSelected}
          />
        </Row>
        <Row className="mb-2">
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
                <Button onClick={checkIsbn}>Verify</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Condition:</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="mint">Mint</option>
              <option value="very good">Very Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Form.Label>Delivery Preferences:</Form.Label>
            {deliveryOptions.map((option, i) => (
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={i}
                key={i}
                checked={delivery_preference?.includes(option)}
                onChange={(e) => {
                  e.target.checked
                    ? setDelivery_preference((s) => [...s, option])
                    : setDelivery_preference((s) =>
                        s.filter((item) => item !== option)
                      );
                }}
                label={option}
              />
            ))}
          </Col>
        </Row>
        <Row className="mt-3">
          {!isbnChecked && (
            <p className="text-center text-danger">
              You must verify the ISBN before adding to collection
            </p>
          )}
          <Button
            type="submit"
            disabled={!isbnChecked}
            className="align-self-end"
          >
            Add to collection
          </Button>
        </Row>
      </Container>
    </Form>
  );
}

export default CollectionAddForm;
