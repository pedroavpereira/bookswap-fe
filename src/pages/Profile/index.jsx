import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Button, Container, Row, Col } from "react-bootstrap";
import FullPageSpinner from "../../components/FullPageSpinner";
import WishList from "../../components/WishList";

const Profile = () => {
  const { user, isLoading: isUserLoading, logout } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user && !isUserLoading) {
        navigate("/");
      }
    },
    [user, navigate, isUserLoading]
  );

  if (isUserLoading) {
    return <FullPageSpinner />;
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
      <WishList />
    </Container>
  );
};

export default Profile;
