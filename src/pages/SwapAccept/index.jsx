import { useNavigate, useParams } from "react-router-dom";
import { useSwaps } from "../../contexts/SwapsContext";
import FullPageSpinner from "../../components/FullPageSpinner";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import { Col, Container, Row } from "react-bootstrap";
import CollectionCard from "../../components/CollectionCard";

function SwapHistory() {
  const navigate = useNavigate();
  const { swap_id } = useParams();
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
      console.log(swap);
      if (!swap) return;

      if (
        swap?.user_requesting === user?.user_id ||
        swap.status !== "pending"
      ) {
        navigate("/swaps");
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
    const room = await acceptSwap({
      swap_id,
      collection_id: selected.collection_id,
    });

    navigate(`/chats/${room.room_id}`);
  }

  async function handleReject() {
    await rejectSwap(swap.swap_id);
    navigate(`/swaps`);
  }

  if (loading) return <FullPageSpinner />;
  return (
    <Container>
      <Row>
        <Col xs={8}>
          <h1>
            Select a book from {swap?.userRequested.first_name}'s Collection
          </h1>
        </Col>
        <Col className="d-flex gap-3 justify-content-end align-items-center">
          <button
            className="action-button"
            onClick={handleAccept}
            disabled={!collectionSelected}
          >
            Accept
          </button>
          <button onClick={handleReject} className="action-button">
            Reject
          </button>
        </Col>
      </Row>
      <Row>
        <div className="collection-card-row">
          {collections.map((el) => (
            <div
              className={`hover-scale ${
                el.collection_id === selected?.collection_id
                  ? "card-selected"
                  : ""
              }`}
              key={el.collection_id}
            >
              <CollectionCard collection={el} onClick={handleCardClick} />
            </div>
          ))}
        </div>
      </Row>
    </Container>
  );
}

export default SwapHistory;
