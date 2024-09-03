import { useCollections } from "../../contexts/CollectionsContext";
import { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import CollectionAddForm from "../../components/CollectionAddForm";

import FullPageSpinner from "../../components/FullPageSpinner";
// import BookList from "../../components/BookList";
import { Col, Container, Row } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard";
import BookList from "../../components/BookList";

const Collection = () => {
  const navigate = useNavigate();
  const { collections, isLoading, createCollection, deleteCollection } =
    useCollections();
  const { user, isLoading: userLoading } = useUser();
  const [showModal, setShowModal] = useState(false);

  useEffect(
    function () {
      if (!userLoading && !user) {
        navigate("/");
      }
    },
    [userLoading, user, navigate]
  );

  function handleCreateCollection(data) {
    setShowModal(false);
    createCollection(data);
  }

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  function handleDeleteCollection(collection) {
    deleteCollection(collection.collection_id);
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

        <BookList>
          {collections.map((col) => (
            <BookCard
              key={col.collection_id}
              user={col.user}
              book={col.book}
              collection={col}
              onDelete={handleDeleteCollection}
              type="display"
            />
          ))}
        </BookList>

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
