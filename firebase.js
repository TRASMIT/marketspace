// ✅ Load Firebase SDKs
document.write(`
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"><\/script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"><\/script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"><\/script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"><\/script>
`);

// ✅ Firebase Configuration (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyBOIYbsZq8J-N2e-DE9lQtqBplmJGGyU2Y",
    authDomain: "elvenail.firebaseapp.com",
    projectId: "elvenail",
    storageBucket: "elvenail.firebasestorage.app",
    messagingSenderId: "157530111056",
    appId: "1:157530111056:web:a430f8a8ee78b6fcf16555"
    measurementId: "G-9GK31THNTV"
};

// ✅ Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

// ✅ Firebase References
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ✅ Function to Fetch Products
function fetchProducts() {
    console.log("📌 Fetching Products...");

    db.collection("products").onSnapshot((snapshot) => {
        let productsContainer = document.getElementById("products");
        if (productsContainer) {
            productsContainer.innerHTML = "";
            snapshot.forEach((doc) => {
                let product = doc.data();
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
        }
        console.log("✅ Products Loaded Successfully!");
    });
}

// ✅ Call Fetch Products
fetchProducts();

// ✅ Logout Function
function logout() {
    auth.signOut().then(() => {
        alert("✅ Logged out successfully!");
        window.location.href = "login.html";
    }).catch(error => {
        console.error("❌ Logout Error:", error);
    });
}
