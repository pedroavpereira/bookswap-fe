import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function () {
  const recommandations = [
    {
      book_id: 1,
      title: "A man for all markets",
      authors: ["Ed. O. Thorp"],
      images: "image2.jpg",
    },
    {
      book_id: 2,
      title: "Money matters",
      authors: ["Jack C K"],
      images: "image2.jpg",
    },
    {
      book_id: 3,
      title: "Money matters",
      authors: ["Jack C K"],
      images: "image2.jpg",
    },
    {
      book_id: 4,
      title: "Money matters",
      authors: ["Jack C K"],
      images: "image2.jpg",
    },
    {
      book_id: 5,
      title: "Money matters",
      authors: ["Jack C K"],
      images: "image2.jpg",
    },
  ];
  return (
    <div>
      <h1>Your recommandations here ...</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "95vw",
          overflowY: "scroll",
        }}
      >
        <div style={{ display: "flex", alignSelf: "center", gap: "1em" }}>
          {recommandations.map((r) => (
            <BookCard
              key={r.book_id}
              id={r.book_id}
              title={r.title}
              authors={r.authors}
              images={r.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BookCard({ id, title, authors, images }) {
  return (
    <Card style={{ width: "12rem" }}>
      <Card.Img variant="top" src="book_cover_unavailable.jpg" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Authors:
          {authors.map((a) => (
            <span>{a}</span>
          ))}
        </Card.Text>
        <Button variant="primary">Add to watchlist</Button>
      </Card.Body>
    </Card>
  );
}
