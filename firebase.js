// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
