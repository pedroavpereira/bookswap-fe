import { useCollections } from "../../contexts/CollectionsContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";

import CollectionAddForm from "../../components/CollectionAddForm";
import FullPageSpinner from "../../components/FullPageSpinner";
import CollectionCard from "../../components/CollectionCard";

const Collection = () => {
  const { collections, isLoading, createCollection } = useCollections();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Updated to useNavigate

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  const handleCardClick = (collections) => {
    navigate(`/offering/${collections.book.book_id}`, {
      state: { collections },
    });
  };

  if (isLoading) return <FullPageSpinner />;

  return (
    <>
      <Container>
        <Row>
          <Col xs={10}>
            <h1>Your Collection</h1>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Button variant="outline-secondary" onClick={handleOpen}>
              Add new Book
            </Button>
          </Col>
        </Row>

        <div className="collection-card-row">
          {collections.map((col) => (
            <CollectionCard
              key={col.collection_id}
              collection={col}
              onClick={() => handleCardClick(col)}
            />
          ))}
        </div>

        <Modal show={showModal} onHide={handleClose} animation={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add new book to collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CollectionAddForm onSubmit={createCollection} />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Collection;
