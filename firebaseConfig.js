// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz8FgH144TpbK7poHCrPXi2tu7ih2waNA",
  authDomain: "next-firebase-a7fc9.firebaseapp.com",
  projectId: "next-firebase-a7fc9",
  storageBucket: "next-firebase-a7fc9.firebasestorage.app",
  messagingSenderId: "1069589640207",
  appId: "1:1069589640207:web:f7d1e70cb33a79d3c61f7a",
  measurementId: "G-XZW9TKLJ4L",
};

// Initialize Firebase
let app;
let auth;
let database;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  const analytics = getAnalytics(app); // Optional, only if you need analytics
  database = getFirestore(app);
}

// Export the Firebase services
export { app, auth, database };
