// ✅ Wait until the page is fully loaded before initializing Firebase
window.onload = function () {
    console.log("📌 Initializing Firebase...");

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
    window.auth = firebase.auth();
    window.db = firebase.firestore();

    console.log("✅ Firebase Initialized Successfully!");

    // ✅ Fetch Products Only When Firebase is Ready
    fetchProducts();
};

// ✅ Fetch Products Function
function fetchProducts() {
    console.log("📌 Fetching Products...");

    if (!window.db) {
        console.error("❌ Firebase not initialized yet!");
        return;
    }

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

// ✅ Logout Function
function logout() {
    auth.signOut().then(() => {
        alert("✅ Logged out successfully!");
        window.location.href = "login.html";
    }).catch(error => {
        console.error("❌ Logout Error:", error);
    });
}
