import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Col, Container, Row } from "react-bootstrap";
import WishlistAddForm from "../../components/WishlistAddForm";
import FullPageSpinner from "../../components/FullPageSpinner";
import WishListCard from "../../components/WishListCard";
import { API_URL } from "../../utils/constants";
import BookList from "../../components/BookList";

const WishList = () => {
  const navigate = useNavigate();
  const [wishlists, setWishLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishList = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const options = {
        method: "GET",
        headers: {
          Authorization: token,
        },
      };

      const response = await fetch(`${API_URL}/wishlists/mine`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWishLists(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch wishlist. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchWishList();
  }, [fetchWishList]);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const createWishList = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/wishlists`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newData = await response.json();
      setWishLists((prevWishlists) => [...prevWishlists, newData]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError("Failed to create wishlist item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWishlist = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/wishlists/${id}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setWishLists((prevWishlists) => prevWishlists.filter((el) => el.wishlist_id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete wishlist item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <FullPageSpinner />;

  return (
    <Container>
      {error && <div className="error-message">{error}</div>}
      <Row>
        <Col xs={10}>
          <h1>Your Wishlist</h1>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <button className="action-button" onClick={handleOpen}>
            Add new Book
          </button>
        </Col>
      </Row>
      <Row>
        <BookList>
          {wishlists.map((wish) => (
            <WishListCard
              wish={wish}
              key={wish.wishlist_id}
              onDelete={deleteWishlist}
            />
          ))}
        </BookList>
      </Row>

      <Modal show={showModal} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new book to wishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WishlistAddForm onSubmit={createWishList} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default WishList;