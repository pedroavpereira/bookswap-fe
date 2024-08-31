import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Modal, Col, Container, Row } from "react-bootstrap";

import WishlistAddForm from "../../components/WishlistAddForm";
import FullPageSpinner from "../../components/FullPageSpinner";
import WishListCard from "../../components/WishListCard";

import { API_URL } from "../../utils/constants";
import WishlistTable from "../../components/WishlistTable";
import BookList from "../../components/BookList";

const WishList = () => {
  const navigate = useNavigate();
  const [wishlists, setWishLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(
    function () {
      async function fetchWishList() {
        try {
          setIsLoading(true);
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

          console.log("beforeFetch");

          const response = await fetch(`${API_URL}/wishlists/mine`, options);

          console.log("afterFetch");
          console.log(response);
          if (response.status !== 200) return null;

          const data = await response.json();

          setWishLists(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      console.log("useEffect");
      fetchWishList();
    },
    [navigate]
  );

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
      setIsLoading(true);
      const response = await fetch(`${API_URL}/wishlists`, options);

      if (response.status !== 201) return null;

      const data = await response.json();

      setWishLists((col) => [...col, data]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);
      const response = await fetch(`${API_URL}/wishlists/${id}`, options);

      if (response.status !== 204) return null;

      setWishLists((col) => [...col].filter((el) => el.wishlist_id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <FullPageSpinner />;

  return (
    <>
      <Container>
        {isLoading && <FullPageSpinner />}
        <Row>
          <Col xs={10}>
            <h1>Your Wishlist</h1>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
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

        {/* <WishlistTable wishs={wishlists} onDelete={deleteWishlist} /> */}
        {/* <div className="collection-card-row">
          {wishlists.map((wish) => (
            <WishListCard
              key={wish.wishlist_id}
              wish={wish}
              onDelete={deleteWishlist}
            />
          ))}
        </div> */}

        <Modal show={showModal} onHide={handleClose} animation={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add new book to wishlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WishlistAddForm onSubmit={createWishList} />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default WishList;
