import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "../styles.css";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "drivers"), (snapshot) => {
      const driverData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDrivers(driverData);
    });

    return () => unsub();
  }, []);

  return (
    <div className="driver-list-container">
      <h2>Available Drivers</h2>
      {drivers.length === 0 ? (
        <p>No drivers registered yet.</p>
      ) : (
        <ul className="driver-list">
          {drivers.map((driver) => (
            <li key={driver.id} className="driver-card">
              <img src={driver.imageUrl} alt="Driver" width="100" height="100" />
              <p>
                <strong>{driver.firstName} {driver.lastName}</strong>
                {driver.uid === auth.currentUser?.uid && <span> (You)</span>}
              </p>
              <p>City: {driver.city}</p>
              <p>Fare: ₹{driver.fare}/km</p>
              <p>Phone: {driver.number}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DriverList;
