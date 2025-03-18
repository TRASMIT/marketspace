// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOIYbsZq8J-N2e-DE9lQtqBplmJGGyU2Y",
  authDomain: "elvenail.firebaseapp.com",
  projectId: "elvenail",
  storageBucket: "elvenail.firebasestorage.app",
  messagingSenderId: "157530111056",
  appId: "1:157530111056:web:a430f8a8ee78b6fcf16555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
