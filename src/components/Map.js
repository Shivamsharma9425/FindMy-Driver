import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Container style for the map
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// Default center (Delhi for now)
const center = {
  lat: 28.6139,
  lng: 77.2090,
};

function Map({ markers = [] }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCbapvNSCo5sU-Qcq3fZ9r5SMbJzRRwr-s", // 👈 Replace this
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      zoom={12}
      center={center}
      mapContainerStyle={mapContainerStyle}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  );
}

export default Map;
