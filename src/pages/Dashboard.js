// src/pages/Dashboard.js

import React, { useState } from "react";
import "../styles.css";
import Sidebar from '../components/Sidebar';
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [showRides, setShowRides] = useState(false);

  const distance = 10; // 📍 Mock distance in KM for fare calculation

  const locations = [
    "Connaught Place", "Karol Bagh", "Noida Sector 18", "Saket", "Lajpat Nagar",
    "Rajouri Garden", "Rohini", "Dwarka", "Gurgaon Cyberhub", "Indirapuram"
  ];

  // ✅ When "Search" is clicked
  const handleSearch = () => {
    if (start.trim() && end.trim()) {
      const allDrivers = JSON.parse(localStorage.getItem("drivers")) || [];
      setDrivers(allDrivers); // ⚠️ You can filter by city if needed
      setShowRides(true);
    } else {
      alert("Please select both start and destination.");
    }
  };

  // ✅ When user clicks "Request Ride"
  const handleRequestRide = (driver) => {
    const rideRequest = {
      from: start,
      to: end,
      driverPhone: driver.number, // use this as identifier
      km: 10, // fixed distance for now
      farePerKm: parseFloat(driver.fare),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  
    const existing = JSON.parse(localStorage.getItem("rideRequests")) || [];
    existing.push(rideRequest);
    localStorage.setItem("rideRequests", JSON.stringify(existing));
  
    alert("Ride requested to " + driver.firstName);
  };
  

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content glass-box">
        <h2>Book Your Ride</h2>

        {/* 📍 Start & End Input Section */}
        <div className="input-section">
          <input
            list="start-options"
            placeholder="Select Start Location"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <datalist id="start-options">
            {locations.map((loc, idx) => (
              <option key={idx} value={loc} />
            ))}
          </datalist>

          <input
            list="end-options"
            placeholder="Select Destination"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <datalist id="end-options">
            {locations.map((loc, idx) => (
              <option key={idx} value={loc} />
            ))}
          </datalist>

          <button className="cta-button" onClick={handleSearch}>Search</button>
        </div>

        {/* 🗺️ Google Map Section */}
        <div className="map-box">
          <iframe
            title="Map"
            src={`https://maps.google.com/maps?saddr=${encodeURIComponent(start)}&daddr=${encodeURIComponent(end)}&output=embed`}
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen
          ></iframe>
        </div>

        {/* 🚗 Rides Section */}
        {showRides && (
          <div className="ride-list">
            <h3>Available Drivers</h3>
            {drivers.length > 0 ? (
              drivers.map((driver, index) => (
                <div key={index} className="ride-card">
                  <strong>{driver.firstName} {driver.lastName}</strong><br />
                  Fare (for {distance} km): ₹{parseFloat(driver.fare) * distance}<br />
                  <button className="cta-button" onClick={() => handleRequestRide(driver)}>
                    Request Ride
                  </button>
                </div>
              ))
            ) : (
              <p>No drivers found for this destination.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
