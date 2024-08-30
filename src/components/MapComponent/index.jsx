import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useBookSwap } from "../../contexts/BookSwapContext";

const MapComponent = ({ latitude, longitude }) => {
  const { obfuscatedLocations, setSelectedUser } = useBookSwap();
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapStyles = {
    height: "400px",
    width: "100%",
    border: "1px solid #ccc",
  };

  const center =
    latitude !== undefined && longitude !== undefined
      ? { lat: latitude, lng: longitude }
      : { lat: 0, lng: 0 };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  useEffect(() => {
    if (map && latitude !== undefined && longitude !== undefined) {
      const newCenter = { lat: latitude, lng: longitude };
      map.setCenter(newCenter);
      map.setZoom(15); // Set a closer zoom level
      console.log("Map centered at:", newCenter);
    }
  }, [map, latitude, longitude]);

  useEffect(() => {
    console.log("Obfuscated locations:", obfuscatedLocations);
  }, [obfuscatedLocations]);

  if (loadError) {
    return <div>Error loading maps: {loadError.message}</div>;
  }

  if (!isLoaded) {
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
        {/* Only display markers and circles if latitude and longitude are provided */}
        {latitude !== undefined && longitude !== undefined && (
          <>
            <Marker
              position={center}
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            />
            <Circle
              center={center}
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
          Provided Location: Lat{" "}
          {latitude !== undefined ? latitude.toFixed(4) : "N/A"}, Lng{" "}
          {longitude !== undefined ? longitude.toFixed(4) : "N/A"}
        </p>
        <p>
          Obfuscated Current Location: Lat{" "}
          {obfuscatedLocations.current?.lat !== undefined
            ? obfuscatedLocations.current.lat.toFixed(4)
            : "N/A"}
          , Lng{" "}
          {obfuscatedLocations.current?.lng !== undefined
            ? obfuscatedLocations.current.lng.toFixed(4)
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

// PropTypes validation
MapComponent.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default MapComponent;
