/* eslint-disable react/prop-types */
import { Badge, Card } from "react-bootstrap";
import { HiTrash } from "react-icons/hi2";

function WishListCard({ wish, onDelete }) {
  function handleDelete() {
    onDelete(wish.wishlist_id);
  }

  return (
    <Card style={{ width: "16rem" }} className="relative">
      <Card.Img
        variant="top"
        style={{ aspectRatio: "9/13", scale: "0.8" }}
        src={wish?.book.image}
      />
      <Card.Body className="pt-0">
        <Card.Title className="text-center">{wish?.book.title}</Card.Title>
        <Card.Text className="text-center">
          <span className="fw-bold">Radius: </span>
          {wish?.radius}
        </Card.Text>
        <Badge
          onClick={handleDelete}
          pill
          className="collection-card-delete p-2 fs-4 text-white bg-danger"
        >
          <HiTrash />
        </Badge>
      </Card.Body>
    </Card>
  );
}

export default WishListCard;
