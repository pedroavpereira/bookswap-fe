import React from "react";
import { Badge, Card } from "react-bootstrap";
import { HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function CollectionCard({ collection, onClick }) {
  const navigate = useNavigate();

  console.log(collection);

  function handleDelete() {
    onClick(collection.collection_id);
  }

  function handleImageClick() {
    navigate(`/offering/${collection.book.book_id}`, {
      state: { collection },
    });
  }

  return (
    <Card style={{ width: "16rem" }} className="relative">
      <Card.Img
        variant="top"
        style={{ aspectRatio: "9/13", scale: "0.8", cursor: "pointer" }}
        src={collection?.book.image}
        onClick={handleImageClick}
      />
      <Card.Body className="pt-0">
        <Card.Title className="text-center">
          {collection?.book.title}
        </Card.Title>
        <Card.Text className="text-center">
          <span className="fw-bold">Condition: </span>
          {collection?.condition}
        </Card.Text>
        <Badge
          onClick={handleDelete}
          pill
          className="collection-card-delete p-2 fs-4 text-white bg-danger"
          data-testid="delete-button" // Added data-testid for testing
        >
          <HiTrash />
        </Badge>
      </Card.Body>
    </Card>
  );
}

export default CollectionCard;
