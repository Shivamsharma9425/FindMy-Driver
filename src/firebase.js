// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Correct Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAJBja3GNkUE2QtGGy7BMjSDfAMeMbQHxY",
  authDomain: "findmy-driver.firebaseapp.com",
  projectId: "findmy-driver",
  storageBucket: "findmy-driver.appspot.com", // ✅ Corrected this
  messagingSenderId: "299700867504",
  appId: "1:299700867504:web:98138f026edd321be5c675"
};

// ✅ Initialize App
const app = initializeApp(firebaseConfig);

// ✅ Setup Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
