// src/pages/RequestHistory.js
import React, { useEffect, useState } from 'react';
import '../styles.css';

const RequestHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('rideRequests')) || [];
    setRideHistory(requests);
  }, []);

  return (
    <div className="page-content">
      <h2>Request History</h2>
      <p>Here you can view all your previous driver requests.</p>

      {rideHistory.length === 0 ? (
        <p className="no-history">No past requests found.</p>
      ) : (
        <div className="history-list">
          {rideHistory.map((ride, index) => (
            <div key={index} className="history-card glass-box">
              <p><strong>From:</strong> {ride.from}</p>
              <p><strong>To:</strong> {ride.to}</p>
              <p><strong>Driver:</strong> {ride.driverName}</p>
              <p><strong>Fare:</strong> ₹{ride.fare}</p>
              <p><strong>Status:</strong> {ride.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestHistory;
