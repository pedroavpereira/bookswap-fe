import { useCollections } from "../../contexts/CollectionsContext";
import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import CollectionAddForm from "../../components/CollectionAddForm";

import FullPageSpinner from "../../components/FullPageSpinner";
// import BookList from "../../components/BookList";
import { Col, Container, Row } from "react-bootstrap";

const Collection = () => {
  const { collections, isLoading, createCollection, deleteCollection } =
    useCollections();
  const [showModal, setShowModal] = useState(false);

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  console.log(collections);

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
