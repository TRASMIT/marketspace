// Import Firebase services
import { auth } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Check if the user is logged in or out
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log("User is signed in:", user.email);
      document.getElementById("logout-btn").style.display = "block"; // Show logout button
    } else {
      // User is signed out
      console.log("User is signed out");
      document.getElementById("logout-btn").style.display = "none"; // Hide logout button
    }
  });
});

// Login function
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User logged in successfully!");
      window.location.href = "index.html"; // Redirect to homepage after login
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    });
}

// Signup function
function signup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User signed up successfully!");
      window.location.href = "index.html"; // Redirect to homepage after signup
    })
    .catch((error) => {
      console.error("Signup failed:", error.message);
      alert("Signup failed: " + error.message);
    });
}

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

// Export functions to make them accessible in HTML
window.login = login;
window.signup = signup;
window.logout = logout;
