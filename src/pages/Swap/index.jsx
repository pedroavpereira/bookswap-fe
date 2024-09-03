import { Container, Tab, Tabs, Row, Modal, Button } from "react-bootstrap";
import { useSwaps } from "../../contexts/SwapsContext";
import { useUser } from "../../contexts/UserContext";

import FullPageSpinner from "../../components/FullPageSpinner";
import SwapsCard from "../../components/SwapsCard";
import BookList from "../../components/BookList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserReviewForm from "../../components/UserReviewForm";

function Swap() {
  const navigate = useNavigate();
  const {
    swaps,
    isLoading: swapsLoading,
    rejectSwap,
    completeSwap,
  } = useSwaps();
  const { user, isLoading: userLoading } = useUser();
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [selectedSwapForCompletion, setSelectedSwapForCompletion] = useState(
    {}
  );

  const loading = swapsLoading || userLoading;

  const pendingSwaps = swaps?.filter(
    (el) => el.status === "pending" && el.user_offered === user.user_id
  );
  const acceptedSwaps = swaps?.filter(
    (el) => el.status == "accepted" && el.completed !== true
  );

  const completedSwaps = swaps?.filter(
    (el) => el.completed === true && user.user_id !== el.user_requesting
  );

  function navigateToAccept(swap_id) {
    navigate(`/swap/accept/${swap_id}`);
  }

  function toggleModal(swap) {
    setSelectedSwapForCompletion(swap);
    setIsModalOpen((s) => !s);
  }

  function handleComplete(swap_id) {
    completeSwap(swap_id);
    setIsModalOpen(false);
  }

  if (loading) return <FullPageSpinner />;

  return (
    <>
      <Container className="mt-5">
        <Row>
          <h1>Your Swaps</h1>
        </Row>

        <Row>
          <Tabs
            defaultActiveKey="pending"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab
              tabClassName="swap-tab-title"
              eventKey="pending"
              title={`Pending (${pendingSwaps ? pendingSwaps.length : 0})`}
            >
              <BookList>
                {pendingSwaps?.map((swap) => (
                  <SwapsCard swap={swap} key={swap.swap_id}>
                    <div className="swap-action-buttons">
                      <button
                        className="action-button action-button-highlight"
                        onClick={() => navigateToAccept(swap.swap_id)}
                      >
                        View collection
                      </button>
                      <button
                        className="action-button action-button-primary"
                        onClick={() => rejectSwap(swap.swap_id)}
                      >
                        Reject
                      </button>
                    </div>
                  </SwapsCard>
                ))}
              </BookList>
            </Tab>
            <Tab
              tabClassName="swap-tab-title"
              eventKey="accepted"
              title={`Accepted (${acceptedSwaps ? acceptedSwaps.length : 0})`}
            >
              <BookList>
                {acceptedSwaps?.map((swap) => (
                  <SwapsCard swap={swap} key={swap.swap_id}>
                    <div className="swap-action-buttons">
                      <button
                        className="action-button action-button-highlight"
                        onClick={() => toggleModal(swap)}
                      >
                        Mark as completed
                      </button>
                    </div>
                  </SwapsCard>
                ))}
              </BookList>
            </Tab>
            <Tab
              tabClassName="swap-tab-title"
              eventKey="completed"
              title={`Completed (${
                completedSwaps ? completedSwaps.length : 0
              })`}
            >
              <BookList>
                {completedSwaps?.map((swap) => (
                  <SwapsCard swap={swap} key={swap.swap_id}>
                    <div className="swap-action-buttons">
                      Swap was: {swap.status}
                    </div>
                  </SwapsCard>
                ))}
              </BookList>
            </Tab>
          </Tabs>
        </Row>
      </Container>
      {modalIsOpen && (
        <Modal show={modalIsOpen} onHide={() => toggleModal({})} centered>
          <Modal.Header closeButton>
            <Modal.Title>Review a fellow book lover</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <UserReviewForm
              swap={selectedSwapForCompletion}
              onSubmit={handleComplete}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default Swap;
