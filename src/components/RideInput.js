// components/RideInput.js
import React from "react";
import "../styles.css";

const RideInput = () => {
  return (
    <div className="ride-input">
      <input type="text" placeholder="Start Location" className="ride-box" />
      <input type="text" placeholder="Destination" className="ride-box" />
      <button className="search-btn">Search</button>
    </div>
  );
};

export default RideInput;
