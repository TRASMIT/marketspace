import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOIYbsZq8J-N2e-DE9lQtqBplmJGGyU2Y",
  authDomain: "elvenail.firebaseapp.com",
  projectId: "elvenail",
  storageBucket: "elvenail.firebasestorage.app",
  messagingSenderId: "157530111056",
  appId: "1:157530111056:web:a430f8a8ee78b6fcf16555",
  measurementId: "G-9GK31THNTV"  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
