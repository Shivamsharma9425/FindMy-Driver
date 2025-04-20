// src/pages/DriverSignup.js

import { useState } from "react";
import { auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const DriverSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", age: "", dob: "", number: "",
    aadhaar: "", bankNumber: "", pan: "", city: "", fare: ""
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ✅ Handle Text Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = "";

      if (image) {
        const imgRef = ref(storage, `drivers/${auth.currentUser.uid}-${image.name}`);
        await uploadBytes(imgRef, image);
        imageUrl = await getDownloadURL(imgRef);
      }

      const newDriver = {
        ...formData,
        imageUrl,
        uid: auth.currentUser?.uid || Date.now(),
        createdAt: new Date().toISOString()
      };

      // ✅ Save to localStorage
      const existingDrivers = JSON.parse(localStorage.getItem("drivers")) || [];
      const updatedDrivers = [...existingDrivers, newDriver];
      localStorage.setItem("drivers", JSON.stringify(updatedDrivers));

      // ✅ Optionally set current driver info
      localStorage.setItem("driverInfo", JSON.stringify(newDriver));

      alert("Driver registered successfully!");
      navigate("/driver-dashboard"); // or "/driver-list"
    } catch (error) {
      console.error("Error adding driver: ", error);
      alert("Error registering driver.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="driver-signup-container">
      <form className="driver-form" onSubmit={handleSubmit}>
        <h2>Driver Signup</h2>

        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="date" name="dob" onChange={handleChange} required />
        <input type="text" name="number" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="aadhaar" placeholder="Aadhaar Card Number" onChange={handleChange} required />
        <input type="text" name="bankNumber" placeholder="Bank Account Number" onChange={handleChange} required />
        <input type="text" name="pan" placeholder="PAN Number" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="number" name="fare" placeholder="Fare per km" onChange={handleChange} required />

        {/* <label className="image-label">
          Upload your image file:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label> */}

        <button type="submit" className="cta-button" disabled={uploading}>
          {uploading ? "Registering..." : "Register as Driver"}
        </button>
      </form>
    </div>
  );
};

export default DriverSignup;
