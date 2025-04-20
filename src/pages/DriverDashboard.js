// src/pages/DriverDashboard.jsx

import React, { useEffect, useState } from "react";
import "../styles.css";

function DriverDashboard() {
  const [driverInfo, setDriverInfo] = useState(null);
  const [rides, setRides] = useState([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const info = localStorage.getItem("driverInfo");
    if (info) {
      const parsed = JSON.parse(info);
      setDriverInfo(parsed);

      const allRequests = JSON.parse(localStorage.getItem("rideRequests")) || [];
      const filtered = allRequests.filter(req => req.driverPhone === parsed.number);
      setRides(filtered);

      const total = filtered
        .filter((ride) => ride.status === "accepted")
        .reduce((sum, ride) => sum + ride.km * ride.farePerKm, 0);

      setEarnings(total);
    }
  }, []);

  const handleAction = (index, status) => {
    const updatedRides = [...rides];
    updatedRides[index].status = status;
    setRides(updatedRides);

    const allRequests = JSON.parse(localStorage.getItem("rideRequests")) || [];
    const reqIndex = allRequests.findIndex(
      (r) =>
        r.from === updatedRides[index].from &&
        r.to === updatedRides[index].to &&
        r.driverPhone === updatedRides[index].driverPhone
    );

    if (reqIndex !== -1) {
      allRequests[reqIndex].status = status;
      localStorage.setItem("rideRequests", JSON.stringify(allRequests));
    }
  };

  return (
    <div className="driver-dashboard-container">
      <h2 className="dashboard-title">Driver Dashboard</h2>

      {driverInfo ? (
        <div className="driver-profile glass-box">
          <img
            src={
              driverInfo.imageUrl ||
              "https://cdn-icons-png.flaticon.com/512/194/194935.png"
            }
            alt="Driver"
            className="driver-avatar"
          />
          <div>
            <h3>{driverInfo.firstName} {driverInfo.lastName}</h3>
            <p>📞 {driverInfo.number}</p>
            <p>🏙️ {driverInfo.city}</p>
            <p>Fare: ₹{driverInfo.fare}/km</p>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <div className="earnings-box glass-box">
        <h3>Total Earnings: ₹{earnings}</h3>
      </div>

      <h3>Ride Requests</h3>
      {rides.length === 0 ? (
        <p>No ride requests yet.</p>
      ) : (
        <div className="rides-container">
          {rides.map((ride, index) => (
            <div key={index} className="ride-card glass-box">
              <p><strong>From:</strong> {ride.from}</p>
              <p><strong>To:</strong> {ride.to}</p>
              <p><strong>Distance:</strong> {ride.km} km</p>
              <p><strong>Fare:</strong> ₹{ride.km * ride.farePerKm}</p>
              <p><strong>Status:</strong> {ride.status}</p>

              {ride.status === "pending" && (
                <div className="ride-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleAction(index, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleAction(index, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DriverDashboard;
