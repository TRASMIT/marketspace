import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase.js";

const db = getFirestore(app);

// Function to load products from Firestore
const loadProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = document.getElementById("product-list");
        productList.innerHTML = "";
        
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productElement = document.createElement("div");
            productElement.classList.add("product-item");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart('${doc.id}')">Add to Cart</button>
            `;
            productList.appendChild(productElement);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
};

// Call loadProducts on page load
document.addEventListener("DOMContentLoaded", loadProducts);

// Function to add product to cart
window.addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
};
