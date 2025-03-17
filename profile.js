// Import Firebase services
import { auth } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is logged in
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      const userEmail = document.getElementById("user-email");
      userEmail.textContent = user.email; // Display the user's email
    } else {
      // User is signed out, redirect to login page
      window.location.href = "login.html";
    }
  });
});

// Logout function
function logout() {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully!");
      window.location.href = "login.html"; // Redirect to login page after logout
    })
    .catch((error) => {
      console.error("Logout failed:", error.message);
      alert("Logout failed: " + error.message);
    });
}
