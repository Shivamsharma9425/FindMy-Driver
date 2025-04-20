import React from 'react';
import './PageStyles.css';

const Help = () => {
  return (
    <div className="info-page">
      <h2>Help & Support</h2>
      <div className="info-card">
        <h3>FAQs</h3>
        <p>Find answers to the most commonly asked questions regarding our platform and services.</p>
      </div>
      <div className="info-card">
        <h3>Contact Us</h3>
        <p>Reach out via chat, email or phone support. We're here to help 24/7.</p>
      </div>
      <div className="info-card">
        <h3>Feedback</h3>
        <p>Share your experience with us to help improve our services.</p>
      </div>
    </div>
  );
};

export default Help;
