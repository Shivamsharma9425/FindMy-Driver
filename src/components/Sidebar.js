// 
import React, { useEffect, useState } from 'react';
import "../styles.css";
import { auth, db } from '../firebase';
import {
  FaCar, FaClock, FaBox, FaGlobe, FaTruck,
  FaBell, FaShieldAlt, FaCog, FaInfoCircle,
  FaFacebook, FaInstagram
} from 'react-icons/fa';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const profilePic = localStorage.getItem("profilePic");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="sidebar glass-sidebar">
      <div className="profile-section">
        <img
          src={profilePic || "https://i.pravatar.cc/100"}
          alt="Profile"
          className="profile-pic"
        />
        <h3>{username || "Guest"}</h3>
        <p className="rating">⭐⭐⭐⭐⭐ <span>(6)</span></p>
      </div>

      <nav className="menu">
        <li onClick={() => navigate('/city')}><FaCar /> City</li>
        <li onClick={() => navigate('/request-history')}><FaClock /> Request History</li>
        <li onClick={() => navigate('/couriers')}><FaBox /> Couriers</li>
        <li onClick={() => navigate('/outstation')}><FaGlobe /> Outstation</li>
        <li onClick={() => navigate('/freight')}><FaTruck /> Freight</li>
        <li onClick={() => navigate('/notifications')}><FaBell /> Notifications</li>
        <li onClick={() => navigate('/safety')}><FaShieldAlt /> Safety</li>
        <li onClick={() => navigate('/settings')}><FaCog /> Settings</li>
        <li onClick={() => navigate('/help')}><FaInfoCircle /> Help</li>
      </nav>

      <button onClick={() => navigate("/driver-dashboard")} className="driver-mode driver-mode-btn">Driver Mode</button>

      <button onClick={() => navigate('/driver-signup')} className="become-driver-btn">Become a Driver</button>

      <div className="social-links">
        <FaFacebook />
        <FaInstagram />
      </div>
    </div>
  );
};

export default Sidebar;