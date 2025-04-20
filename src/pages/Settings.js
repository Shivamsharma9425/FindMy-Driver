import React, { useState } from 'react';
import './PageStyles.css';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
//import { updatePassword } from 'firebase/auth';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const Settings = () => {
  // Profile states
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [profilePic, setProfilePic] = useState('');

  // Password states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Language states
  const [language, setLanguage] = useState('');

  // Update profile info
  const handleSaveProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await setDoc(userRef, {
          name,
          contact,
          profilePic
        }, { merge: true });

        localStorage.setItem('username', name);
        localStorage.setItem('profilePic', profilePic);

        alert('Profile successfully updated!');
        setShowProfileForm(false);
        window.location.reload();
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  // Cancel profile edit
  const handleCancelUpdate = () => {
    setShowProfileForm(false);
  };

  // Change password
  const handlePasswordChange = async () => {
    const user = auth.currentUser;
    const email = user?.email;
  
    if (user && newPassword) {
      const currentPassword = prompt("Please re-enter your current password to confirm:");
  
      if (!currentPassword) {
        alert("Password change cancelled.");
        return;
      }
  
      const credential = EmailAuthProvider.credential(email, currentPassword);
  
      try {
        // Reauthenticate first
        await reauthenticateWithCredential(user, credential);
  
        // Then update password
        await updatePassword(user, newPassword);
  
        alert('Password updated successfully.');
        setShowChangePassword(false);
        setNewPassword('');
      } catch (error) {
        console.error('Password update error:', error);
        alert('Error: ' + error.message);
      }
    }
  };

  // Change language preference
  const handleLanguageChange = async (selectedLang) => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await setDoc(userRef, { language: selectedLang }, { merge: true });
        setLanguage(selectedLang);
        alert(`Language set to ${selectedLang.toUpperCase()}`);
      } catch (err) {
        console.error('Language update error:', err);
        alert('Failed to set language. Try again.');
      }
    }
  };

  return (
    <div className="info-page">
      <h2>Account Settings</h2>

      {/* Update Profile */}
      <div className="info-card">
        <h3>Update Profile</h3>
        <p>Manage your profile information including your name, contact number, and profile picture.</p>
        {!showProfileForm ? (
          <button onClick={() => setShowProfileForm(true)}>Go to Profile Settings</button>
        ) : (
          <div className="profile-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter profile picture URL"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
            <button onClick={handleSaveProfile}>Save</button>
            <button onClick={handleCancelUpdate}>Cancel</button>
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="info-card">
        <h3>Change Password</h3>
        <p>Update your account password for better security and protection.</p>
        {!showChangePassword ? (
          <button onClick={() => setShowChangePassword(true)}>Change Password</button>
        ) : (
          <div className="profile-form">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange}>Save</button>
            <button onClick={() => setShowChangePassword(false)}>Cancel</button>
          </div>
        )}
      </div>

      {/* Language Preference */}
      <div className="info-card">
        <h3>Language Preferences</h3>
        <p>Select your preferred language for a localized experience.</p>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="language-select"
        >
          <option value="">-- Select Language --</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;