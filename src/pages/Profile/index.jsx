<<<<<<< HEAD
import React from "react";
function Profile() {
  return <div></div>;
}
=======
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Button, Container, Row, Col } from "react-bootstrap";
import FullPageSpinner from "../../components/FullPageSpinner";
import WishList from "../../components/WishList";
import ReviewList from "../../components/Reviewlist";
import "./Profile.css";

const Profile = () => {
  const { user, isLoading: isUserLoading, logout } = useUser();
  const navigate = useNavigate();
  const [location, setLocation] = useState("Location not set");

  useEffect(() => {
    if (!user && !isUserLoading) {
      navigate("/");
    }
  }, [user, navigate, isUserLoading]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (user && user.lat && user.lng) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${user.lat}&lon=${user.lng}&zoom=10&accept-language=en`
          );
          const data = await response.json();
          if (data.address) {
            const city =
              data.address.city || data.address.town || data.address.village;
            const country = data.address.country;
            setLocation(
              city && country
                ? `${city}, ${country}`
                : city || country || "Location not found"
            );
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          setLocation("Error fetching location");
        }
      }
    };

    fetchLocation();
  }, [user]);

  if (isUserLoading) {
    return <FullPageSpinner />;
  }

  const fullName = `${user.first_name} ${user.last_name}`.trim();

  const handleActivityClick = () => {
    navigate("/swap");
  };

  return (
    <Container className="profile-container mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="profile-name">{fullName}</h1>
          <p className="profile-location">{location}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Button variant="outline-primary" className="me-2">
            Profile
          </Button>
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={handleActivityClick}
          >
            Activity
          </Button>
          <Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <WishList />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <ReviewList userId={user.user_id} />
        </Col>
      </Row>
    </Container>
  );
};
>>>>>>> dev

export default Profile;
