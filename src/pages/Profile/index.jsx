import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; // Custom hook to access user context
import FullPageSpinner from '../../components/FullPageSpinner'; // Spinner component to show during loading
import WishList from '../../components/WishList'; // Component to show user's wishlist
import ReviewList from '../../components/ReviewList'; // Component to show user's reviews

const Profile = () => {
  const { user, isLoading, logout } = useUser(); // Destructuring user data, loading state, and logout function from useUser hook
  const [location, setLocation] = useState(null); // State to store location data
  const [locationError, setLocationError] = useState(null); // State to store any errors while fetching location
  const navigate = useNavigate(); // useNavigate hook for programmatically navigating

  // useEffect hook to redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [isLoading, user, navigate]);

  // useEffect hook to fetch location data based on user's coordinates
  useEffect(() => {
    if (user) {
      const fetchLocation = async () => {
        try {
          const response = await fetch(`https://api.locationiq.com/v1/reverse.php?key=YOUR_API_KEY&lat=${user.lat}&lon=${user.lng}&format=json`);
          const data = await response.json();
          setLocation(`${data.address.city}, ${data.address.country}`);
        } catch (error) {
          setLocationError('Failed to fetch location');
        }
      };

      fetchLocation();
    }
  }, [user]);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (!user) {
    return null; // Render nothing if user is not authenticated
  }

  return (
    <div className="profile-container">
      <h1>{`${user.first_name} ${user.last_name}`}</h1>
      {location ? (
        <p>{location}</p>
      ) : (
        <p>{locationError || 'Fetching location...'}</p>
      )}

      <WishList userId={user.user_id} />
      <ReviewList userId={user.user_id} />

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
