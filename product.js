// Import Firebase services
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Function to load product details
function loadProductDetails() {
  const productDetails = document.getElementById("product-details");

  // Get the product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    // Fetch the product details from Firestore
    getDoc(doc(db, "products", productId))
      .then((doc) => {
        if (doc.exists()) {
          const product = doc.data();
          productDetails.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <img src="${product.image}" alt="${product.name}" width="200">
            <p>${product.description || "No description available."}</p>
          `;
        } else {
          productDetails.innerHTML = "<p>Product not found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching product details: ", error);
        productDetails.innerHTML = "<p>Error loading product details.</p>";
      });
  } else {
    productDetails.innerHTML = "<p>Invalid product ID.</p>";
  }
}

// Function to add product to cart
function addToCart() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    getDoc(doc(db, "products", productId))
      .then((doc) => {
        if (doc.exists()) {
          const product = doc.data();
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Product added to cart!");
        } else {
          alert("Product not found.");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart: ", error);
        alert("Failed to add product to cart.");
      });
  } else {
    alert("Invalid product ID.");
  }
}

// Call the function to load product details when the page loads
document.addEventListener("DOMContentLoaded", loadProductDetails);
