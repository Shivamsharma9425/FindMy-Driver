import React from 'react';
import './PageStyles.css';

const Safety = () => {
  return (
    <div className="info-page">
      <h2>Safety Guidelines</h2>
      <div className="info-card">
        <h3>Verified Drivers</h3>
        <p>All drivers undergo rigorous background checks and training before being listed on our platform.</p>
      </div>
      <div className="info-card">
        <h3>Emergency Support</h3>
        <p>Access 24/7 emergency assistance via our in-app SOS button.</p>
      </div>
      <div className="info-card">
        <h3>Live Ride Tracking</h3>
        <p>Track your ride in real-time and share your trip status with trusted contacts.</p>
      </div>
    </div>
  );
};

export default Safety;