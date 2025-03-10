// ✅ Load Firebase SDKs for Firebase v9+ (MODULAR)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// ✅ Firebase Configuration (REPLACE WITH YOUR ACTUAL CONFIG)
const firebaseConfig = {
    apiKey: "AIzaSyBOIYbsZq8J-N2e-DE9lQtqBplmJGGyU2Y",
    authDomain: "elvenail.firebaseapp.com",
    projectId: "elvenail",
    storageBucket: "elvenail.appspot.com",  // ✅ FIXED STORAGE URL
    messagingSenderId: "157530111056",
    appId: "1:157530111056:web:a430f8a8ee78b6fcf16555",
    measurementId: "G-9GK31THNTV"  // ✅ FIXED MISSING COMMA
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Function to Fetch Products
function fetchProducts() {
    console.log("📌 Fetching Products...");

    const productsContainer = document.getElementById("products");
    if (!productsContainer) return;

    onSnapshot(collection(db, "products"), (snapshot) => {
        productsContainer.innerHTML = "";
        snapshot.forEach((doc) => {
            const product = doc.data();
            productsContainer.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart('${doc.id}', '${product.name}', ${product.price})">
                        Add to Cart
                    </button>
                </div>`;
        });
        console.log("✅ Products Loaded Successfully!");
    });
}

// ✅ Call Fetch Products on Page Load
document.addEventListener("DOMContentLoaded", fetchProducts);

// ✅ Logout Function
function logout() {
    signOut(auth).then(() => {
        alert("✅ Logged out successfully!");
        window.location.href = "login.html";
    }).catch(error => {
        console.error("❌ Logout Error:", error);
    });
}
