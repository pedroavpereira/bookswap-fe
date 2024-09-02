import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { API_URL } from "../../utils/constants";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import WishlistAddForm from "../../components/WishlistAddForm";
import WishListCard from "../../components/WishListCard";
import FullPageSpinner from "../../components/FullPageSpinner";
import BookList from "../../components/BookList";

const Profile = () => {
  const { user, isLoading: isUserLoading, logout } = useUser();
  const [wishlists, setWishlists] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchWishList() {
      try {
        setIsWishlistLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const options = {
          method: "GET",
          headers: {
            Authorization: token,
          },
        };

        const response = await fetch(`${API_URL}/wishlists/mine`, options);
        if (response.status !== 200) {
          console.error("Failed to fetch wishlist:", response.status);
          return;
        }

        const data = await response.json();
        setWishlists(data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setIsWishlistLoading(false);
      }
    }

    fetchWishList();
  }, []);

  function handleOpen() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  async function createWishList(data) {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      setIsWishlistLoading(true);
      const response = await fetch(`${API_URL}/wishlists`, options);
      if (response.status !== 201) {
        console.error("Failed to create wishlist item:", response.status);
        return null;
      }

      const newWishlistItem = await response.json();
      setWishlists((prev) => [...prev, newWishlistItem]);
    } catch (err) {
      console.error("Error creating wishlist item:", err);
    } finally {
      setIsWishlistLoading(false);
      setShowModal(false);
    }
  }

  async function deleteWishlist(id) {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };

    try {
      setIsWishlistLoading(true);
      const response = await fetch(`${API_URL}/wishlists/${id}`, options);
      if (response.status !== 204) {
        console.error("Failed to delete wishlist item:", response.status);
        return null;
      }

      setWishlists((prev) => prev.filter((el) => el.wishlist_id !== id));
    } catch (err) {
      console.error("Error deleting wishlist item:", err);
    } finally {
      setIsWishlistLoading(false);
    }
  }

  if (isUserLoading || isWishlistLoading) {
    return <FullPageSpinner />;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const fullName = `${user.first_name} ${user.last_name}`.trim();

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-2xl font-bold">{fullName || "User Profile"}</h1>
          <p className="text-sm text-gray-500">Location not set</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Button variant="primary" className="me-2">
            Profile
          </Button>
          <Button variant="secondary" className="me-2">
            Activity
          </Button>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2 className="text-xl font-bold mb-2">User Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={user.first_name || ""}
              readOnly
            />
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={user.last_name || ""}
              readOnly
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={user.email || ""}
              readOnly
            />
            <input
              type="text"
              className="form-control"
              placeholder="Post Code"
              value={user.lat || ""}
              readOnly
            />
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={10}>
          <h2 className="text-xl font-bold mb-2">Your Wishlist</h2>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button variant="outline-secondary" onClick={handleOpen}>
            Add new Book
          </Button>
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

export default Profile;
