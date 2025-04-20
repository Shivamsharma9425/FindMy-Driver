// src/App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Pages & Components
import Login from "./components/Login";
import Signup from "./components/Signup"; // (create this if needed)
import Dashboard from "./pages/Dashboard";
import DriverSignup from './pages/DriverSignup';
import Landing from "./pages/Landing";
import DriverList from "./pages/DriverList";
import DriverDashboard from "./pages/DriverDashboard";
import City from "./pages/City";
import RequestHistory from "./pages/RequestHistory";
import Couriers from "./pages/Couriers";
import Outstation from "./pages/Outstation";
import Freight from "./pages/Freight";
import Notifications from "./pages/Notifications";
import Safety from "./pages/Safety";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route path="/signup" element={!user ? <Signup /> : <Signup />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/driver-list" element={<DriverList />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        
        <Route path="/city" element={<City />} />
        <Route path="/request-history" element={<RequestHistory />} />
        <Route path="/couriers" element={<Couriers />} />
        <Route path="/outstation" element={<Outstation />} />
        <Route path="/freight" element={<Freight />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
