console.log("📌 Initializing Firebase...");

// ✅ Your Firebase Config (Replace with your actual values)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ✅ Ensure Firebase is initialized only once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// ✅ Firebase References
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

console.log("✅ Firebase Initialized Successfully!");
