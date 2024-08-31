import React from "react";
import { useCollections } from "../../contexts/CollectionsContext";
import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import CollectionAddForm from "../../components/CollectionAddForm";

import FullPageSpinner from "../../components/FullPageSpinner";
// import BookList from "../../components/BookList";
import { Col, Container, Row } from "react-bootstrap";
import CollectionCard from "../../components/CollectionCard";

const Collection = () => {
  const { collections, isLoading, createCollection, deleteCollection } =
    useCollections();
  const [showModal, setShowModal] = useState(false);

  function handleCreateCollection(data) {
    console.log("handleCreation");
    setShowModal(false);
    createCollection(data);
  }

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  if (isLoading) return <FullPageSpinner />;

  return (
    <>
      <Container>
        {isLoading && <FullPageSpinner />}
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
              onClick={deleteCollection}
            />
          ))}
        </div>

        <Modal show={showModal} onHide={handleClose} animation={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add new book to collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CollectionAddForm onSubmit={handleCreateCollection} />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Collection;
