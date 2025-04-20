// components/RideList.js
import React from "react";
import "../styles.css";

const rides = [
  { id: 1, driver: "Ravi", price: "₹120", location: "Nearby" },
  { id: 2, driver: "Amit", price: "₹100", location: "2 km away" },
];

const RideList = () => {
  return (
    <div className="ride-list">
      {rides.map((ride) => (
        <div key={ride.id} className="ride-card">
          <h3>{ride.driver}</h3>
          <p>{ride.location}</p>
          <span>{ride.price}</span>
        </div>
      ))}
    </div>
  );
};

export default RideList;

