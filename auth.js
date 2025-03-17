// Initialize Firebase Authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Check if the user is logged in or out
document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
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

  auth.signInWithEmailAndPassword(email, password)
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

  auth.createUserWithEmailAndPassword(email, password)
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
  auth.signOut()
    .then(() => {
      console.log("User signed out successfully!");
      window.location.href = "login.html"; // Redirect to login page after logout
    })
    .catch((error) => {
      console.error("Logout failed:", error.message);
      alert("Logout failed: " + error.message);
    });
}
