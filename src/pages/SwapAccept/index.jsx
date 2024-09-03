import { useNavigate, useParams } from "react-router-dom";
import { useSwaps } from "../../contexts/SwapsContext";
import FullPageSpinner from "../../components/FullPageSpinner";
import BookList from "../../components/BookList";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import { Col, Container, Row } from "react-bootstrap";
import BookCard from "../../components/BookCard";
import { useChats } from "../../contexts/ChatsContext";

function SwapHistory() {
  const navigate = useNavigate();
  const { swap_id } = useParams();
  const { newRoom } = useChats();
  const { swaps, acceptSwap, rejectSwap, isLoading: loadingSwaps } = useSwaps();
  const { user, isLoading: loadingUser } = useUser();
  const [collections, setCollections] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loading = loadingSwaps || loadingUser || isLoading;

  const collectionSelected = Boolean(selected);

  const swap = swaps?.find((sw) => sw.swap_id === +swap_id);

  useEffect(
    function () {
      if (!swap) return;

      if (
        swap?.user_requesting === user?.user_id ||
        swap.status !== "pending"
      ) {
        navigate("/swap");
        return;
      }
    },
    [navigate, user, swap]
  );

  useEffect(
    function () {
      async function fetchCollection() {
        try {
          setIsLoading(true);

          const response = await fetch(
            `${API_URL}/collections/user/${swap?.user_requesting}`
          );

          if (response.status !== 200) return;

          const data = await response.json();

          setCollections(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      if (!user) return;

      fetchCollection();
    },
    [swap, user]
  );

  function handleCardClick(col) {
    setSelected(col);
  }

  async function handleAccept() {
    // console.log("handleAccept", selected, swap_id);
    const room = await acceptSwap({
      swap_id: +swap_id,
      collection_id: selected.collection_id,
    });

    newRoom(room);

    navigate("/swap");
  }

  async function handleReject() {
    await rejectSwap(swap.swap_id);
    navigate(`/swap`);
  }

  if (loading) return <FullPageSpinner />;
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={8}>
          <h1>
            Select a book from {swap?.userRequested.first_name}'s Collection
          </h1>
        </Col>
        <Col className="d-flex gap-3 justify-content-end align-items-center">
          <button
            className="action-button action-button-highlight"
            onClick={handleAccept}
            disabled={!collectionSelected}
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="action-button action-button-primary"
          >
            Reject
          </button>
        </Col>
      </Row>
      <Row className="mt-5">
        <BookList>
          {collections.map((col) => (
            <div
              key={col.collection_id}
              className={`hover-scale ${
                selected?.collection_id === col?.collection_id
                  ? "card-selected"
                  : ""
              }`}
            >
              <BookCard
                onClick={handleCardClick}
                book={col.book}
                user={col.user}
                collection={col}
                type="selection"
              />
            </div>
          ))}
        </BookList>
      </Row>
    </Container>
  );
}

export default SwapHistory;
