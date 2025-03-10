import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { app, db, storage } from "./firebase.js"; // Import Firebase setup

// ✅ Fetch Products Function
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
                </div>`;
        });
        console.log("✅ Products Loaded Successfully!");
    });
}

// ✅ Add Product Function
document.getElementById("addProductForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const file = document.getElementById("productImage").files[0];

    if (!name || !price || !category || !file) {
        alert("❌ Please fill all fields!");
        return;
    }

    try {
        // ✅ Upload image to Firebase Storage
        const storageRef = ref(storage, `products/${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(uploadResult.ref);

        // ✅ Add product to Firestore
        await addDoc(collection(db, "products"), {
            name,
            price: parseFloat(price),
            category,
            image: imageUrl
        });

        alert("✅ Product added successfully!");
        document.getElementById("addProductForm").reset();
    } catch (error) {
        console.error("❌ Error adding product:", error);
    }
});

// ✅ Logout Function
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("✅ Logged out successfully!");
        window.location.href = "login.html";
    }).catch(error => console.error("❌ Logout Error:", error));
});

// ✅ Run Fetch Products when Page Loads
document.addEventListener("DOMContentLoaded", fetchProducts);
