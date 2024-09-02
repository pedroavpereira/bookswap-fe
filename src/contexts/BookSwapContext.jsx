// src/context/BookSwapContext.jsx
import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { obfuscateLocation } from "./utils";

const BookSwapContext = createContext();

export const BookSwapProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [obfuscatedLocations, setObfuscatedLocations] = useState({});

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentUser({
              id: "current",
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            // console.log("Got user's location:", position.coords);
          },
          (error) => {
            console.error("Error getting location:", error);
            // Fallback to New York coordinates if geolocation fails
            setCurrentUser({
              id: "current",
              latitude: 40.7128,
              longitude: -74.006,
            });
          }
        );
      } else {
        // console.log("Geolocation is not supported by this browser.");
        // Fallback to New York coordinates if geolocation is not supported
        setCurrentUser({
          id: "current",
          latitude: 40.7128,
          longitude: -74.006,
        });
      }
    };

    getUserLocation();

    // Simulating API call to get other users' data
    setOtherUsers([
      { id: "user1", latitude: 40.7148, longitude: -74.0068 },
      { id: "user2", latitude: 40.7118, longitude: -74.005 },
    ]);
  }, []);

  useEffect(() => {
    if (currentUser && otherUsers.length > 0) {
      const obfuscated = {
        current: obfuscateLocation(currentUser.latitude, currentUser.longitude),
        ...otherUsers.reduce(
          (acc, user) => ({
            ...acc,
            [user.id]: obfuscateLocation(user.latitude, user.longitude),
          }),
          {}
        ),
      };
      setObfuscatedLocations(obfuscated);
    }
  }, [currentUser, otherUsers]);

  const value = {
    currentUser,
    otherUsers,
    selectedUser,
    setSelectedUser,
    obfuscatedLocations,
  };

  return (
    <BookSwapContext.Provider value={value}>
      {children}
    </BookSwapContext.Provider>
  );
};

BookSwapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBookSwap = () => {
  const context = useContext(BookSwapContext);
  if (context === undefined) {
    throw new Error("useBookSwap must be used within a BookSwapProvider");
  }
  return context;
};

export { BookSwapContext };

export default BookSwapProvider;
