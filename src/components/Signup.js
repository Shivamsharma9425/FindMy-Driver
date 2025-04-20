import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage,db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import "../styles.css";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

    const handleSignup = async (e) => {
      e.preventDefault();
      setLoading(true);
    
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const user = userCred.user;
    
        let imageBase64 = "";
        if (image) {
          imageBase64 = await toBase64(image);
          localStorage.setItem("profilePic", imageBase64); // ✅ save here only
        }
    
        // ✅ Only set displayName, not photoURL
        await updateProfile(user, {
          displayName: name,
        });
    
        localStorage.setItem("username", name);
    
        alert("Signup successful!");
        navigate("/dashboard");
      } catch (error) {
        alert("Signup Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    
  

  return (
    <div className="glass-signup-form">
      <form onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="image-label">
          Upload your image file:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </label>

        <button type="submit" className="cta-button" disabled={loading}>
          {loading ? "Signing you up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
