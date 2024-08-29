// src/components/MapComponent/index.jsx

import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useBookSwap } from "../../contexts/BookSwapContext";

const MapComponent = () => {
  const { currentUser, obfuscatedLocations, setSelectedUser } = useBookSwap();
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapStyles = {
    height: "400px",
    width: "100%",
    border: "1px solid #ccc",
  };

  const center = currentUser
    ? { lat: currentUser.latitude, lng: currentUser.longitude }
    : { lat: 0, lng: 0 };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  useEffect(() => {
    if (map && currentUser) {
      const newCenter = {
        lat: currentUser.latitude,
        lng: currentUser.longitude,
      };
      map.setCenter(newCenter);
      map.setZoom(15); // Set a closer zoom level
      console.log("Map centered at:", newCenter);
    }
  }, [map, currentUser]);

  useEffect(() => {
    console.log("Current user location:", currentUser);
    console.log("Obfuscated locations:", obfuscatedLocations);
  }, [currentUser, obfuscatedLocations]);

  if (loadError) {
    return <div>Error loading maps: {loadError.message}</div>;
  }

  if (!isLoaded || !currentUser) {
    return <div>Loading maps...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={center}
        zoom={15}
        onLoad={onLoad}
      >
        {obfuscatedLocations.current && (
          <>
            <Marker
              position={obfuscatedLocations.current}
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            />
            <Circle
              center={obfuscatedLocations.current}
              radius={500}
              options={{
                fillColor: "blue",
                fillOpacity: 0.1,
                strokeColor: "blue",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
          </>
        )}

        {Object.entries(obfuscatedLocations).map(
          ([userId, location]) =>
            userId !== "current" && (
              <React.Fragment key={userId}>
                <Marker
                  position={location}
                  onClick={() => setSelectedUser(userId)}
                />
                <Circle
                  center={location}
                  radius={500}
                  options={{
                    fillColor: "red",
                    fillOpacity: 0.1,
                    strokeColor: "red",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                  }}
                />
              </React.Fragment>
            )
        )}
      </GoogleMap>
      <div>
        <p>
          Current User: Lat {currentUser?.latitude.toFixed(4)}, Lng{" "}
          {currentUser?.longitude.toFixed(4)}
        </p>
        <p>
          Obfuscated Current Location: Lat{" "}
          {obfuscatedLocations.current?.lat.toFixed(4)}, Lng{" "}
          {obfuscatedLocations.current?.lng.toFixed(4)}
        </p>
      </div>
    </div>
  );
};

export default MapComponent;
