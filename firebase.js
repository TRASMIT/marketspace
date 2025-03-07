console.log("📌 Initializing Firebase...");

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ✅ Initialize Firebase only once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// ✅ Firebase References
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

console.log("✅ Firebase Initialized Successfully!");

// ✅ Fetch Products Only When Firebase is Ready
fetchProducts();

// ✅ Fetch Products Function
function fetchProducts() {
    console.log("📌 Fetching Products...");

    if (!db) {
        console.error("❌ Firebase not initialized yet!");
        return;
    }

    db.collection("products").onSnapshot((snapshot) => {
        let productsContainer = document.getElementById("adminProducts");
        if (productsContainer) {
            productsContainer.innerHTML = "";
            snapshot.forEach((doc) => {
                let product = doc.data();
                productsContainer.innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <button onclick="deleteProduct('${doc.id}')">Delete</button>
                    </div>`;
            });
        }
        console.log("✅ Products Loaded Successfully!");
    });
}

// ✅ Logout Function
function logout() {
    auth.signOut().then(() => {
        alert("✅ Logged out successfully!");
        window.location.href = "login.html";
    }).catch(error => {
        console.error("❌ Logout Error:", error);
    });
}

