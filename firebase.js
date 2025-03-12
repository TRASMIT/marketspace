// ✅ Import Firebase Modules (Using Modular Syntax)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOIYbsZq8J-N2e-DE9lQtqBplmJGGyU2Y",
    authDomain: "elvenail.firebaseapp.com",
    projectId: "elvenail",
    storageBucket: "elvenail.appspot.com",
    messagingSenderId: "157530111056",
    appId: "1:157530111056:web:a430f8a8ee78b6fcf16555",
    measurementId: "G-9GK31THNTV"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export Modules
export { app, auth, db, storage };
